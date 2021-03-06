// Flash message
setTimeout(showFlash, 200);
setTimeout(hideFlash, 2000);

// 弹出用户卡片
// TODO: Need to stay popover when hovered.
$(document).popover({
    content: function () {
        return $(this).parent().nextAll('.popover-content-wap').first().html()
    },
    html: true,
    container: 'body',
    trigger: 'hover',
    placement: 'bottom',
    selector: '.user-avatar.user-avatar-popover',
    delay: {
        'hide': 100
    }
});

// 投票
$(document).on('click', '.vote', function () {
    var pieceId = parseInt($(this).attr('data-piece-id')),
        url = "",
        votesCount = $(this).find('.votes-count').first(),
        vote = $(this),
        voted = $(this).hasClass('voted');

    if (voted) {
        url = urlFor('piece.unvote', {uid: pieceId});
    } else {
        url = urlFor('piece.vote', {uid: pieceId});
    }

    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        success: function (response) {
            var currentVotesCount = parseInt(votesCount.text()),
                targetVotesCount;
            if (response.result) {
                if (voted) {
                    targetVotesCount = (currentVotesCount > 0) ? currentVotesCount - 1 : 0;
                    $(".vote[data-piece-id=" + pieceId + "]")
                        .removeClass('voted')
                        .find('.votes-count').text(targetVotesCount);
                } else {
                    targetVotesCount = currentVotesCount + 1;
                    $(".vote[data-piece-id=" + pieceId + "]")
                        .addClass('voted')
                        .find('.votes-count').text(targetVotesCount);
                }
            }
        }
    });
});

/**
 * Show flash message.
 */
function showFlash() {
    $('.flash-message').slideDown('fast');
}

/**
 * Hide flash message.
 */
function hideFlash() {
    $('.flash-message').slideUp('fast');
}
