
    var resultList = $("#resultList");
    resultList.text("This is from JQuery");

    //toggle button changing hiide and show
    var toggleButton = $("#toggleButton");
    toggleButton.on("click", function(){
        resultList.toggle();

        if(toggleButton.text()=="Hide"){
            toggleButton.text("Show")}
        else{
            toggleButton.text("Hide")}
    });
    

$("#githubSearchForm").on("submit", function(){
    
    var searchPhrase = $("#searchPhrase").val();
    var useStars = $("#useStars").val();
    var langChoice = $("#langChoice").val();
    
    if(searchPhrase){
        
        resultList.text("Performing search...");
        
        var githubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);
        
        if(langChoice!="All"){
            githubSearch += "+language:" + encodeURIComponent(langChoice);
        }
        
        if(useStars){
            githubSearch += "&sort=stars";
        }
    
       // var githubSearch = "https://api.github.com/search/repositories?q=jquery+language:javascript&sort=stars";

        $.get(githubSearch).success(function(r){
                displayResults(r.items);
            })
            .fail(function(err){
                console.log("Failed to query Github.");
            });
    }
             return false;
        });



    function displayResults(results){

        resultList.empty();
        $.each(results, function(i , item) {
            
            var newResult= $("<div class='result'>" +
                "<div class='title'>" + item.name + "</div>" +
                "<div> Language: " + item.language + "</div>" +
                "<div> Owner: " + item.owner.login + "</div>" +
                "</div>");
            
            newResult.hover(function() {
                $(this).css("background-color","lightgray");
           
            },function(){
                $(this).css("background-color","transparent");
                
            });
            
            resultList.append(newResult);
        
    });
}
            