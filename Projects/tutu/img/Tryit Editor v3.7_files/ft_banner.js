/**
 * Template type: Type B
 * Description: Main JS file responsible for animation and content mapping.
 * Version: 1.0.0
 */

/**
  * Global data object.
  */
var CONSTANTS = {
  "ANIMATION_DELAY": 3000,
  "TEMPLATE_TYPE": myFT.instantAds.templateType || "DELL",
  "BANNER_WIDTH": myFT.instantAds.bannerWidth,
  "BANNER_HEIGHT": myFT.instantAds.bannerHeight,
  "INSERTCSS": myFT.instantAds.insertCSS,
  "FEED_HEADLINE_NODE": {
    1: myFT.instantAds.feed_Headline_node1.trim(),
    2: myFT.instantAds.feed_Headline_node2.trim(),
    3: myFT.instantAds.feed_Headline_node3.trim()
  },
  "FEED_PRODUCT_IMAGE_NODE": myFT.instantAds.feed_Product_Image_node.trim(),
  "FEED_URL_NODE": myFT.instantAds.feed_URL_node.trim()
}
var instant_ad_vars = {};

/**
 * Helper class takes care of providing all necessorty tracking and additional features.
 * @constructor
 */
function Helper() {
  // Private:
  var productIds = [];
  // Public:
  this.addProductIds = function(id) {
    productIds.push(id)
  };
  this.getProductIds = function(id) {
    return productIds;
  };
}
// Method to update server with loaded product Ids.
Helper.prototype.updateFTServerWithProducts = function() {
  var productIds = this.getProductIds();
  var url = 'https://fdz.flashtalking.com/services/dell/FBI-1941/write.php?value=' + encodeURIComponent(productIds);
  var dataObj = {
    complete: function(request) {
      if(request.status === 200) {
        if(JSON.parse(request.responseText).error) {
          Tracker.impressionTrackEvent("Reporting Service Error");
        }
        else {
          Tracker.impressionTrackEvent(JSON.parse(request.responseText).id);
        }
      }
      else {
        Tracker.impressionTrackEvent("Reporting Service Error");
      }
    }
  };
  // Ajax request.
  myFT.ajax(url, dataObj);
};
// Static variables.
Helper.lastIDvalue = null;
Helper.animateProductHeader = true;
// Method to resize text to keep it inside the div.
Helper.resizeText = function(element) {
  // Return if no text.
  if(!element.textContent) {
    return;
  }
  // Set currentOverflow to hidden.
  var currentOverflow = element.style.overflow;
  if(!currentOverflow || currentOverflow === "visible") {
    element.style.overflow = "hidden";
  }
  var $element = myFT.$(element);
  var letterSpacing = $element.css("letter-spacing").replace(/[^-\d.]/g, '');
  var fontSize = $element.css("font-size").replace(/[^-\d.]/g, '');
  var lineHeight = $element.css("line-height").replace(/[^-\d.]/g, '');
  // Resize text css horizontally.
  while(element.clientWidth < element.scrollWidth) {
    if(letterSpacing > 0) {
      $element.css("letter-spacing", --letterSpacing + "px");
    }
    else {
      $element.css("font-size", --fontSize + "px");
    }
  }
  // Resize text css vertically.
  while(element.clientHeight < element.scrollHeight) {
    if(lineHeight > fontSize) {
      $element.css("line-height", --lineHeight + "px");
    }
    else {
      $element.css("font-size", --fontSize + "px");
    }
  }
  element.style.overflow = currentOverflow;
}
// Method adds query vars to click tags.
Helper.addQueryVarToClickTags = addQueryVarToClickTags;

/**
 * Animate class responsible to provide methods to be used for an animation.
 * @constructor
 */
function Animate() {}
// Method responsible to fadeOut elements.
Animate.prototype.fadeOut = function(prev) {
  for(var id in prev) {
    if(id === "overlay" || id === "overlay_text") {
      continue;
    }
    if(id === "product_details") {
      TweenLite.set(prev['product_details'], {visibility: "hidden", delay: 0.5});
      continue;
    }
    if(id === "product_header" && !Helper.animateProductHeader) {
      TweenLite.set(prev['product_header'], {visibility: "hidden"});
      continue;
    }
    TweenLite.to(prev[id], 0.5, {autoAlpha:0, visibility: "hidden"});
  }
};
// Method responsible to fadeIn elements.
Animate.prototype.fadeIn = function(current, animationComplete) {
  for(var id in current) {
    if(id === "overlay" || id === "overlay_text") {
      continue;
    }
    if(id === "product_details") {
      TweenLite.set(current['product_details'], {visibility: "visible"});
      continue;
    }
    if(id === "product_header" && !Helper.animateProductHeader) {
      TweenLite.set(current['product_header'], {visibility: "visible"});
      continue;
    }
    TweenLite.to(current[id], 0.5, {autoAlpha:1, visibility: "visible", delay: 0.5, onComplete: animationComplete});
  }
};
// Method responsible to unfill prev product selector.
Animate.prototype.unfill = function(prevSelector) {
  TweenLite.set(prevSelector, {"visibility": "hidden"});
};
// Method responsible to fill current product selector.
Animate.prototype.fill = function(currentSelector, animationComplete) {
  TweenLite.set(currentSelector, {visibility: "visible", delay: 0.5, onComplete: animationComplete});
};

/**
 * UserInteraction class responsible for manupulating DOM based on the user interactions.
 * @constructor
 */
function UserInteraction() {}
// Method responsible for handling click event.
UserInteraction.prototype.eventSetup = function(totalFrames, bannerInterval, setStateMethod) {
  var navbar = (totalFrames === 2) ? "two_products_nav": "three_products_nav";
  for(var i=0; i<totalFrames; i++) {
    (function(i) {
      document.getElementById(navbar).querySelector('#product_viewer_' + (i+1)).addEventListener('click', function() {
        // Get next set of elements to display.
        var nextState = {
          productIndex: i
        };
        // set next user selected and clear interval.
        setStateMethod(nextState);
        clearInterval(bannerInterval);
      });

      document.getElementById('product_details_' + (i+1)).querySelector(".overlay_x").addEventListener('click', function() {
        TweenLite.to(document.getElementById('product_details_' + (i+1)).querySelector(".overlay"), 0, {autoAlpha: 0, visibility: 'hidden'});
        TweenLite.to(document.getElementById('product_details_' + (i+1)).querySelector(".overlay_text"), 0, {autoAlpha: 0, visibility: 'hidden'});
      });

      document.getElementById('product_details_' + (i+1)).querySelector(".legal_text").addEventListener('click', function() {
        TweenLite.to(document.getElementById('product_details_' + (i+1)).querySelector(".overlay"), 0, {autoAlpha: 1, visibility: 'visible'});
        TweenLite.to(document.getElementById('product_details_' + (i+1)).querySelector(".overlay_text"), 0, {autoAlpha: 1, visibility: 'visible'});
      });

    })(i);
  }
};

/**
 * Mapper class is responsible for managing a data flow from feeds to creative.
 * @constructor
 */
function Mapper() {}
// Static method responsible for mapping logic.
Mapper.mapProductDetails = function(product, feed, i) {
  // Feed Mapping.
  product.product_header.innerHTML = feed[CONSTANTS.FEED_HEADLINE_NODE[i+1]] || feed.header_product || "";
  if(feed.savings_percent >= 10 || feed.savings_amount >= 100) {
    product.product_offer.innerHTML = CustomVariableHelper.process(feed, instant_ad_vars.customVariable4);
  } else {
    product.product_offer.innerHTML = "";
    TweenLite.set(product.currency_price, {fontSize: '24px', color: 'rgb(0, 125, 184)'});
  }
  product.currency_price.innerHTML = CustomVariableHelper.process(feed, instant_ad_vars.customVariable3);
  var imageType = feed["image_type"] || 'S';
  // Hide all product image types
  TweenLite.set(product.product_image_square, {className: "+=gwd-page-content-display-none"});
  TweenLite.set(product.product_image_wide, {className: "+=gwd-page-content-display-none"});
  TweenLite.set(product.product_image_tall, {className: "+=gwd-page-content-display-none"});
  if(imageType === 'S') {
    product.product_image_square.querySelector('#square').setAttribute("source", feed[CONSTANTS.FEED_PRODUCT_IMAGE_NODE]);
    TweenLite.set(product.product_image_square, {className: "-=gwd-page-content-display-none"});
  } else if(imageType === 'L') { // wide
    product.product_image_wide.querySelector('#wide').setAttribute("source", feed[CONSTANTS.FEED_PRODUCT_IMAGE_NODE]);
    TweenLite.set(product.product_image_wide, {className: "-=gwd-page-content-display-none"});
  } else if(imageType === 'P') { // tall
    product.product_image_tall.querySelector('#tall').setAttribute("source", feed[CONSTANTS.FEED_PRODUCT_IMAGE_NODE]);
    TweenLite.set(product.product_image_tall, {className: "-=gwd-page-content-display-none"});
  }
  // product.product_view_status.innerHTML = feed.text_alt3;
  product.product_name.innerHTML = feed[instant_ad_vars.customVariable2];
  product.mdf_logo.setAttribute("source", feed[instant_ad_vars.customVariable6]);
  product.mdf_desc.innerHTML = feed.vf_desc || "";
  product.overlay_text.innerHTML = feed.overlay_text || "";
  product.legal_text.innerHTML = (feed.regulation && feed.regulation !== "n/a") ? feed.regulation : "";

  // InstantAds Mapping.
  // Custome Resize Text.
  Helper.resizeText(product.product_header);
};

// Static method responsible for mapping non product related details.
Mapper.mapCustomDetails = function(elements, feed) {
  TweenLite.set(elements.dell_logo["DELL"], {visibility: "hidden"});
  TweenLite.set(elements.dell_logo["SB"], {visibility: "hidden"});
  // Feed Mapping.
  if(CONSTANTS.TEMPLATE_TYPE === "DELL") {
    elements.dell_logo[CONSTANTS.TEMPLATE_TYPE].setAttribute('source', feed[instant_ad_vars.customVariable1]);
  } else {
    elements.dell_logo[CONSTANTS.TEMPLATE_TYPE].setAttribute('source', feed[instant_ad_vars.customVariable1]);
  }
  TweenLite.set(elements.dell_logo[CONSTANTS.TEMPLATE_TYPE], {visibility: "visible"});
  elements.cta_text.innerHTML = feed[instant_ad_vars.customVariable5];
  // InstantAds Mapping.
}

/**
 * Banner class responsible to keep track of current state, rendering elements in co-operation with Animate.
 * @constructor
 */
function Banner() {
  this.animate = null; // Animate class handler.
  this.userinteraction = null; // UserInteraction class handler.
  this.helper = null // Helper class handler.
  this.productElements = []; // Holds all of the productElements.
  this.totalFrames = 3; // Total number of frames. Default is 3.
  this.state = {
    current: null, // current holds array of currently displayed elements.
    productIndex: 0, // index of currently displayed product.
    inAnimationOn: false // status of animation.
  };
  // IMP method responsible to render current using Animate class.
  this.render = function(prev, current, prevSelector, currentSelector) {
    // If prevSelector === currentSelector, return.
    if(prevSelector.isEqualNode(currentSelector)) {
      return;
    }
    // Animation Started.
    this.state.isAnimationOn = true;
    // Call fadeOut for prev.
    this.animate.fadeOut(prev);
    // Call fadeIn for current.
    this.animate.fadeIn(current, function(){
      this.state.isAnimationOn = false;
    }.bind(this));
    // Call unfill for prevSelector.
    this.animate.unfill(prevSelector);
    // Call fill for currentSelector.
    this.animate.fill(currentSelector, function(){
      this.state.isAnimationOn = false;
    }.bind(this));
  };
}
// Method responsible to return BannerObject.
Banner.createClass = function() {
  var banner = new Banner();
  banner.userinteraction = new UserInteraction();
  banner.animate = new Animate();
  banner.helper = new Helper();
  return banner;
};
// Method responsible in building a banner.
Banner.prototype.build = function(feeds) {
  // Initialize instantAds
  instant_ad_vars = myFT.instantAds;
  // Crete Custom Variables Helper instance
  var customVariableHelper = new CustomVariableHelper({
    'customVariable1': (instant_ad_vars.templateType === "DELL") ? 'dell_logo1' : 'dell_logo3',
    'customVariable2': 'model_name',
    'customVariable3': 'price_now',
    'customVariable4': 'text_alt2+[ ]+savings_amount',
    'customVariable5': 'cta_txt',
    'customVariable6': 'vf_logo'
  });
  // Clean custom variables.
  customVariableHelper.clean(feeds);
  Mapper.mapCustomDetails({
    "dell_logo": {
      "DELL": document.getElementById('dell_logo'),
      "SB": document.getElementById('dell_technologies_logo')
    },
    "cta_text": document.getElementById('cta_text')
  }, feeds[0]);
  // product details template.
  var product_details = document.getElementById('product_details_1');
  var gwd_page_content = document.querySelector('.gwd-page-content');
  // delete from structure.
  product_details.parentNode.removeChild(product_details);
  // for feeds loop
  for(var i=0; i<Math.min(feeds.length, 3); i++) {
    var product_details1 = product_details.cloneNode(true);
    product_details1.id = 'product_details_' + (i+1);
    TweenLite.set(product_details1, {visibility: "hidden"});
    var product = {
      'product_details': product_details1,
      'currency_price': null,
      'product_image_tall': null,
      'product_image_wide': null,
      'product_image_square': null,
      'product_name': null,
      // 'product_view_status': null,
      'product_offer': null,
      'product_header': null,
      'mdf_logo': null,
      'mdf_desc': null,
      'overlay_text': null,
      "overlay": null,
      'legal_text': null
    };
    // loop through product object.
    Object.keys(product).forEach(function(id) {
      if(id !== 'product_details') {
        product[id] = product_details1.querySelector('#' + id + "_1");
        product[id].id = id + "_" + (i+1);
        TweenLite.set(product[id], {visibility: "hidden"});
      }
    });
    Mapper.mapProductDetails(product, feeds[i], i);
    // InstantAds mapping.
    // Add product Id.
    this.helper.addProductIds(feeds[i].creative_set + '|' + feeds[i].url + '|product');
    this.productElements.push(product);
    // add product_details to dom.
    myFT.$(gwd_page_content).prepend(product_details1);
  }
  // Clickthrough.
  (function (banner) {
    gwd_page_content.addEventListener('click', function(e) {
      if(e.target.className === "x" || jQuery(e.target).parents(".x").length > 0) return;
      if(e.target.className === "legal_text" || jQuery(e.target).parents(".legal_text").length > 0) return;
      if(RegExp('product_viewer_').test(e.target.id)) return;
      var i = banner.state.productIndex;
      let feedSuppliedURL = feeds[i][CONSTANTS.FEED_URL_NODE] || feeds[i].url;
      //call click state event
      var dataStringToTrackOnClick = feeds[i].creative_set || "CLICK_DATA_FOR_SLIDE_" + index;
      //Tracker.clickTrackEvent(dataStringToTrackOnClick);
      Helper.addQueryVarToClickTags("ft_custom", dataStringToTrackOnClick);
      myFT.clickTag(i + 1, feedSuppliedURL);
    });
  })(this);
  // Headline animation update.
  var headlineSet = new Set();
  for(var i=0; i<this.productElements.length; i++) {
    headlineSet.add(this.productElements[i].product_header.innerHTML);
  }
  if(headlineSet.size <= 1) {
    for(var i=0; i<this.productElements.length; i++) {
      Helper.animateProductHeader = false;
    }
  }
  var navbar = (this.totalFrames === 2) ? "two_products_nav": "three_products_nav";
  if(this.totalFrames > 1) TweenLite.set(document.getElementById(navbar), {display: "inline"});
  // FT Server reporting.
  this.helper.updateFTServerWithProducts();
  // Set current product.
  this.state.current = this.productElements[0];
};
// Method responsible to update state and call render method.
Banner.prototype.setState = function(nextState) {
  // if animation on then return.
  if(this.state.isAnimationOn) {
    return;
  }
  var prev = this.state.current;
  var navbar = (this.totalFrames === 2) ? "two_products_nav": "three_products_nav";
  var prevSelector = document.getElementById(navbar).querySelector('#product_viewer_selected_' + (this.state.productIndex + 1));
  // Update current.
  for(var key in nextState) {
    this.state[key] = nextState[key];
  }
  this.state.current = this.productElements[this.state.productIndex];
  var currentSelector = document.getElementById(navbar).querySelector('#product_viewer_selected_' + (this.state.productIndex + 1));
  this.render(prev, this.state.current, prevSelector, currentSelector);
};

/**
 * Driver class responsible for object creation and function calls.
 * @constructor
 */
function Driver() {}
// Static vars.
Driver.driven = false;
// Static Main method.
Driver.main = function(feeds) {
  if(Driver.driven || feeds.length === 0) return;
  // Update driven status.
  Driver.driven = true;
  // Create Banner class.
  var banner = Banner.createClass();
  // Update total frames.
  banner.totalFrames = Math.min(feeds.length, 3);
  // Build banner.
  banner.build(feeds);
  // Add image script.
  var script = document.createElement('script');
  script.src = "gwdimage_min.js";
  document.getElementsByTagName('head')[0].appendChild(script);
  document.querySelector('.gwd-page-content').classList.remove('gwd-page-content-display-none');
  // Display first product.
  for(var id in banner.state.current) {
    if(id !== "overlay" && id !== "overlay_text") {
      TweenLite.set(banner.state.current[id], {visibility: "visible"});
    }
  }
  // Apply any custom css from instantsAds.
  if(CONSTANTS.INSERTCSS !== undefined) {
    myFT.insertCSS(CONSTANTS.INSERTCSS);
  }
  // Update banner state after 3 seconds.
  var bannerInterval = setInterval(function() {
    // Get next set of elements to display.
    var nextState = {
      productIndex: (banner.state.productIndex === banner.totalFrames - 1) ? 0 : banner.state.productIndex + 1
    };
    // set next state.
    banner.setState(nextState);
    // If first product displayed again, clearInterval.
    if(banner.state.productIndex === 0) {
      clearInterval(bannerInterval);
    }
  }, CONSTANTS.ANIMATION_DELAY);
  // eventSetup.
  banner.userinteraction.eventSetup(banner.totalFrames, bannerInterval, banner.setState.bind(banner));
};
// Static Error handling method.
Driver.error = function(error) {
  // Handle error by displaying default banner image.
  document.querySelector('.gwd-page-content').innerHTML = '';
  document.querySelector('.gwd-page-content').style.backgroundImage = 'url('+ myFT.instantAds.backgroundImage +')';
  document.querySelector('.gwd-page-content').classList.remove('gwd-page-content-display-none');
};
/**
  * Handles the event that is dispatched after the Ad has been
  * initialized and before the default page of the Ad is shown.
  */
function handleAdInitialized(event) {
  setTimeout(function() {
    var ftFeed = new FTFeed(myFT);
    ftFeed.getFeed(Driver.main, Driver.error);
  }, 0);
}
// Event handler.
window.addEventListener('adinitialized', handleAdInitialized, false);
// InstantAds event handler.
var adInit = (function() {
  var execute = false;
  return function() {
    if(execute) {
      var gwdAd = document.getElementById('gwd-ad');
      // Initialize an ad.
      setTimeout(function() {
        gwdAd.initAd();
      }, 0);
    }
    execute = true;
  }
})();
myFT.on('instantads', adInit);
window.addEventListener('WebComponentsReady', adInit, false);
