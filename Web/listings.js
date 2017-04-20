var numPages = 10; // will be gotten from server
var currPage = 4; // will be gotten from page arguments

function populatePagination() {
   var pagesContent = "";
   var i;
   for (i = 1; i <= numPages; i++) {
      if (i != currPage) {
         pagesContent += "<li><a href=\"#\">"+i+"</a></li>";
      } else {
         pagesContent += "<li class=\"active\"><a href=\"#\">"+i+"</a></li>";
      }
   }
   
   $("#pagestop").html(pagesContent);
   $("#pagesbottom").html(pagesContent);
}

function populateItems() {
   var items; // select * from items sort by posted desc limit 10 offset (currPage-1)*10;
   var currItemPos = 0; // will be incremented at the beginning of each itteration
   var currItemTitle; // build string to post to html
   var currItemBody; // ditto
   var currItem;
   
   for (/*currItem in items*/currItem = 1; currItem <= 4; currItem++   ) {
      currItemPos++;
      
      //currItemTitle = currItem.title + " <span class=\"glyphicon glyphicon-usd\"></span>" + currItem.price;
      //currItemBody = currItem.description
      
      currItemTitle = "This thing <span class=\"glyphicon glyphicon-usd\"></span>" + currItemPos;
      currItemBody = "Info about item " + currItemPos;
      
      $("#listing"+currItemPos+"title").html(currItemTitle);
      $("#listing"+currItemPos+"body").html(currItemBody);
      $("#listing"+currItemPos).toggle(); // make it visible
   }
}

function populateListings() {
   //var user = Parse.User.current();
   //user.get("")
   populatePagination();
   populateItems();
}
