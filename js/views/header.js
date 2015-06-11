/**
 *  DEFAULT variables for my personal directory hierarchy
 */
var BASEURL = '/projects/';
var PROJECT = 'backbone-directory';
var SLIMLOC = BASEURL+PROJECT+'/api';

window.HeaderView = Backbone.View.extend({

    initialize: function () {
        var url = SLIMLOC+'/session';
        $.ajax({
            url:url,
            type:'GET',
            success:function () {
                $("#logout").show();
            }
        });
        this.searchResults = new EmployeeCollection();
        this.searchresultsView = new EmployeeListView({model: this.searchResults, className: 'dropdown-menu'});
    },

    render: function () {
        $(this.el).html(this.template());
        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keypress .search-query": "onkeypress",
        "click #logout": "logout"
    },

    search: function () {
        var key = $('#searchText').val();
        console.log('search ' + key);
        this.searchResults.findByName(key);
        setTimeout(function () {
            $('.dropdown').addClass('open');
        });
    },

    onkeypress: function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    },

    logout:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = SLIMLOC+'/logout';
        console.log('Logging out... ');

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            success:function () {
                $("#logout").hide();
                // Send them back to the login page
                window.location.replace(BASEURL+PROJECT+'/#');
            }
        });
    }

});