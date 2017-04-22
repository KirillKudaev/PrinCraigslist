var user; // will be gotten from server
var items; // will be gotten from server
var numPages; // items.length / 10 (rounded up)
var currPage; // will be gotten from page arguments

function populatePagination() {
   var pagesContent = "";
   var i;
   for (i = 1; i <= numPages; i++) {
      if (i != currPage) {
         pagesContent += '<li><a href="index.html?page='+i+'">'+i+'</a></li>';
      } else {
         pagesContent += '<li class="active"><a href="index.html?page='+i+'">'+i+'</a></li>';
      }
   }
   
   $("#pagestop").html(pagesContent);
   $("#pagesbottom").html(pagesContent);
}

function populateItems() {
   var currItemPos = 0; // will be incremented at the beginning of each itteration
   var currItemTitle; // build string to post to html
   var currItemBody; // ditto
   var currItem;
   
   
   
   for (currItem = (currPage - 1) * 10; currItemPos < 10; currItem++) {
      currItemPos++;
      
      currItemTitle = items[currItem].get("title") + " <span class=\"glyphicon glyphicon-usd\"></span>" + items[currItem].get("price") + " Seller: " + items[currItem].get("userEmail");
      currItemBody = items[currItem].get("description");
      
      $("#listing"+currItemPos+"title").html(currItemTitle);
      $("#listing"+currItemPos+"body").html(currItemBody);
      $("#listing"+currItemPos).toggle(); // make it visible
      if (items[currItem].get("id") == user.id) {
         $("#listing"+currItemPos+"footer").toggle();
      }
   }
}

// This function borrowed from Stack Overflow user Reza Baradaran
// Source: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function storeItems(results) {
   items = results;
   numPages = Math.ceil(items.length / 10);
   currPage = $.urlParam("page");
   if (currPage == null) {
      currPage = 1; // no argument, default to page 1
   }
   console.log("title: " + item[0].get("title"));
   console.log("desc: " + item[0].get("description"));
   console.log("price: " + item[0].get("price"));
   console.log("id: " + item[0].get("objectId"));
   console.log("userId: " + item[0].get("userId"));
   console.log("userEmail: " + item[0].get("userEmail"));
}

function populateListings() {
   user = getUser();
   if (user != null) {
      $("headUserNotSignedIn").toggle();
      $("headUserSignedIn").toggle();
      $("footUserNotSignedIn").toggle();
      $("footUserSignedIn").toggle();
   }
   getItems(storeItems);
   populatePagination();
   populateItems();
}
