$(document).ready(function(){
    // $('.id-share');
    $('.puzzle-parts--item').on('click', function(e){
    	e.preventDefault();
        var link = $(this).attr('href');
    	$('.popup--head').html('<a href = get_file.php?download='+ link +'>Download Puzzle #'+ link +'</a>');
    });
});