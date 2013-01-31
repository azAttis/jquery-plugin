/**
 * Friend model
 *
 * @param  string name   friend name
 * @param  Person parent reference to parent
 * @return object
 */
function Friend(name, parent) {
	return {
		  name: ko.observable(name)
		, isOnTwitter: ko.observable(false)
		, twitterName: ko.observable()
		  // in context of this object will work
		, remove: function() {
			parent.friends.remove(this);
		}
	};
}

/**
 * Person model
 */
function Person () {
	this.firstName = ko.observable("Bert");
	this.lastName  = ko.observable("Smith");

	this.fullName  = ko.computed(function() {
									return this.firstName() + " " + this.lastName();
				 				}
				 				, this
	);

	this.friends = ko.observableArray([new Friend("Steve", this), new Friend("Annie", this)]);

	this.addFriend = function () {
		this.friends.push(new Friend("Another", this));
	};

	this.save = function () {
		$.ajax({
			  url: "save.php"
			, type: "post"
			, dataType: "json"
			, data: ko.toJSON(this)
			, contentType: "application/json"
			, success: function (result) {
				alert(result)
			}
		});
	};
}

// Fire knockoutjs
ko.applyBindings(new Person());
