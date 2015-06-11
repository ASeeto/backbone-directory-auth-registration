# backbone-directory-auth-registration
[Backbone Directory](https://github.com/ccoenraets/backbone-directory) is a simple Employee Directory application built with [Backbone.js](http://documentcloud.github.com/backbone/) and [Twitter Bootstrap](http://getbootstrap.com/). [Backbone Directory - Auth](https://github.com/clintberry/backbone-directory-auth) is the same application with added authentication functionality.
The application allows you to look up employees by name, view the details of an employee, and navigate up and down the Org Chart by clicking the employee’s manager or any of his/her direct reports.

Further expanding upon these projects, I have added basic user registration capabilities in addition to minor changes to the login view. My implementation of user registration utilizes PHP's built in [Email Validation](http://php.net/manual/en/filter.examples.validation.php) as well as one way hashing for passwords through use of [password_hash()](http://php.net/manual/en/function.password-hash.php).

# Manual Setup
Prerequisites: LAMP Server (Linux, Apache, MySQL, PHP) - [10 Step Guide](https://gist.github.com/ASeeto/1ebec9b2802c0469f848)

1) Clone the project:  
  ```
  git clone https://github.com/ASeeto/backbone-directory-auth-registration
  ```

2) Create a MySQL database named 'project':  
  - Execute directory.sql to create and populate the "employee" table:  
  ```
  mysql directory -uroot < directory.sql
  ```
  - Execute users.sql to create and populate the "users" table:  
  ```
  mysql directory -uroot < users.sql
  ```

3) Change the following files according to your directory hierarchy: 
  ```
  /js/main.js
  /js/views/header.js
  /js/views/login.js
  /js/views/register.js
  /js/models/employeemodel.js
  ```
  For convenience, I have provided the following DEFAULT variables for you to alter in each file:
  ```
  BASEURL : (the overarching directory for all projects)
  PROJECT : (the name of your project)
  SLIMLOC : (the location of Slim Framework for this project)
  ```

# Resources
Please check out the projects below for more information.
- [Backbone Directory](https://github.com/ccoenraets/backbone-directory) by [Christophe Coenraets](http://coenraets.org/)
- [Backbone Directory - Auth](https://github.com/clintberry/backbone-directory-auth) by [Clint Berry](http://clintberry.com/)
