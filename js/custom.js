$(function() {
    var sections = $('.set');

    function navigateTo(index) {
        sections.removeClass('current').eq(index).addClass('current'); //chaining
        // Show only the navigation buttons that make sense for the current section:
        $('.navigation .left').toggle(index > 0); // To make it visible only if it has to be navigated back
        var endFind = index >= sections.length - 1;
        $('.navigation .right').toggle(!endFind);
        $('.navigation #register').toggle(endFind);
    }
    //Find the current index
    function curIndex() {
        // Return the current index by looking at which section has the class 'current'
        return sections.index(sections.filter('.current'));
    }
    // Previous button is easy, just go back
    $('.navigation .left').click(function() {
        navigateTo(curIndex() - 1);
    });
    // Next button goes forward if current block validates
    $('.navigation .right').click(function() {
        if ($('.multistep').parsley().validate({
                group: 'block-' + curIndex()
            })) {
            navigateTo(curIndex() + 1);
        }

    });
    // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
    sections.each(function(index, section) {
        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    });
    navigateTo(0); // Start at the beginning  
});