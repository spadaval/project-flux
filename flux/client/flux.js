/*global groups,events,FlowRouter,BlazeLayout*/
$(".dropdown-button").dropdown();



Template.groupPanel.helpers({
  groupData: function () {
    return groups.find().fetch();
  },
  getGroupPath:function(groupId){
    return FlowRouter.path("/community/groups/:groupid",{groupid:groupId});
  }
});

Template.eventsPanel.helpers({
  eventsData: function () {
    return events.find().fetch();
  }
});

Template.groupPageContent.helpers({
  getEvents: function () {
    return events.find({createdby:FlowRouter.getParam("groupid")}).fetch();
  },
  getName:function(){
    return groups.findOne({_id:FlowRouter.getParam("groupid")}).name;
  },
  getDescription:function(){
    return groups.findOne({_id:FlowRouter.getParam("groupid")}).description || "No description given";
  }
});

FlowRouter.route('/community', {
  action: function() {
    BlazeLayout.render("layout", {content: "communityPageContent",breadcrumbs:"communityPageBreadcrumb"});
  }
});
FlowRouter.route('/', {
  action: function() {
    FlowRouter.go("/community");
  }
});
FlowRouter.route('/groups', {
  action: function() {
    FlowRouter.go("/community");
  }
});

FlowRouter.route('/community/groups/:groupid', {
  name:"group",
  action: function() {
    BlazeLayout.render("layout", {content: "groupPageContent",breadcrumbs:"groupPageBreadcrumb"});
  }
});