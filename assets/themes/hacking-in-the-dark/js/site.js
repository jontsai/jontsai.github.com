$(function() {
    /* -------------------------------------------------- */
    /* "Local" Globals */

    // CSS selectors
    var CSS_ID_BUTTON_STRIPE_DONATE = 'button_stripe_donate';

    var CSS_CLASS_BELOW_FOLD = 'below-fold';

    // Nodes
    var main = $('#main');
    var documentBody = $(document.body);

    // App variables

    /* End "Local" Globals */
    /* -------------------------------------------------- */

    // Custom App Functions

    function handleWindowResized(e) {
        reflowContent();
    }

    function handleWindowScrolled(e) {
        reflowContent();
    }

    function reflowContent() {
        var scrollY = documentBody.get('docScrollY');
        var mainY = main.offset().top;
        var leftBox = $('#left_box');
        var rightBox = $('#right_box');
        if (scrollY > mainY) {
            // get the current X, which will become the new margin
            // left and right side are mirrored
            var sideboxMarginLeft = leftBox.offset().left;
            leftBox.addClass(CSS_CLASS_BELOW_FOLD);
            leftBox.css('marginleft', sideboxMarginLeft);

            rightBox.addClass(CSS_CLASS_BELOW_FOLD);
            rightBox.css('margin-left', sideboxMarginLeft);
        } else {
            leftBox.removeClass(CSS_CLASS_BELOW_FOLD);
            leftBox.css('margin-left', 'auto');

            rightBox.removeClass(CSS_CLASS_BELOW_FOLD);
            rightBox.css('margin-left', 'auto');
        }
    }

    function handleStripeDonateButtonPressed(e) {
        var button = this;
        e.preventDefault();
        var handler = StripeCheckout.configure({
            key: STRIPE_KEY,
            image: GRAVATAR_IMG,
            token: function(token, args) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
                console.log('token: ' + token.id);
            }
        });
        handler.open({
            name: 'jontsai.com',
            description: 'Donation',
            amount: 2000
        });
    }

    // App Initializers
    function initEventHandlers() {
        $(window).on('resize', $.debounce(10, handleWindowResized));
        $(window).on('scroll', $.debounce(10, handleWindowScrolled));
        //main.delegate('tap', handleStripeDonateButtonPressed, '#' + CSS_ID_BUTTON_STRIPE_DONATE);
    }

    function init() {
    }
    initEventHandlers();
    init();
});
