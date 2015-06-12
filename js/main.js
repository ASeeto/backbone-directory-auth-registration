/**
 *  DEFAULT variables for my personal directory hierarchy
 */
var BASEURL = '/projects/';
var PROJECT = 'backbone-directory';
var SLIMLOC = BASEURL+PROJECT+'/api';

// Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
            window.location.replace(BASEURL+PROJECT+'/#login');
         
        },
        403: function() {
            // 403 -- Access denied
            window.location.replace(BASEURL+PROJECT+'/#denied');
        }
    }
});

window.Router = Backbone.Router.extend({

    routes: {
        "": "login",
        "home": "home",
        "contact": "contact",
        "employees/:id": "employeeDetails",
        "login": "login",
        "register":"register"
    },

    login: function() {
        $('#content').html(new LoginView().render().el);
    },

    register: function() {
        $('#content').html(new RegisterView().render().el);
    },
    
    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
    },

    home: function () {
        this.headerView.select('home-menu');
        var page = 'home';
        var url = SLIMLOC+'/session';
        $.ajax({
            url:url,
            type:'GET',
            success:function () {
                window.location.replace(BASEURL+PROJECT+'/#'+page);
                if (!this.homeView) {
                    this.homeView = new HomeView();
                    this.homeView.render();
                }
                $("#content").html(this.homeView.el);
            },
            error:function () {
                window.location.replace(BASEURL+PROJECT+'/#login');
                $('.nav li').removeClass('active');
            }
        });
    },

    contact: function () {
        if (!this.contactView) {
            this.contactView = new ContactView();
            this.contactView.render();
        }
        $('#content').html(this.contactView.el);
        this.headerView.select('contact-menu');
    },

    employeeDetails: function (id) {
        var employee = new Employee({id: id});
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                $('#content').html(new EmployeeView({model: data}).render().el);
            }
        });
    }

});

templateLoader.load(["HomeView", "ContactView", "HeaderView", "EmployeeView", "EmployeeSummaryView", "EmployeeListItemView", "LoginView", "RegisterView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });