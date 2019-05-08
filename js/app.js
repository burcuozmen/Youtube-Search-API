function tplawesome(e,t){
    res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res};


$(function() {
    $("form").on("submit", function(e){
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
          part : "snippet",
          type: "video",
          q : encodeURIComponent ($("#search").val()).replace(/%20/g, "+" ),
          maxResults :3 ,
          order: "viewCount",

       });
       //execute the request
       request.execute(function(response) {
        console.log(response);
        var results = response .result;
        $.each(results.items,function (index, item){
            console.log(item);
             $.get("tpl/item.html", function(data){
            // $("#results").append(item.id.videoId +" "+ item.snippet.title + "<br>" );
               $("#results").append(tplawesome (data , [{"title" :item.snippet.title, "videoId":item.id.videoId}]));
             });
        });
        
       });

    });

});

function init(){
    gapi.client.setApiKey("AIzaSyCm7EiGmQGVz0sYR-87sip8UPN_FSjF9ik");
    gapi.client.load("youtube" ,"v3" , function(){
        //youtube api is ready
    });
}
