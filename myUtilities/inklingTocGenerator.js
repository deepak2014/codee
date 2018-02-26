/*
###  jQuery Content loader Plugin v1.0 - 2014-09-30  ###
###  updated v1.1 - 2017-03-29  ###
This is a simple jQuery plugin to load the content to the server.
*/
(function(){
	$.fn.inklingTocGenerator = function(options){
		//Internal variable declaration
		//this.initVarIfAny;

		//Defaults
		var defaults = {
                        "toc": {
                            "metadata": {
                                "edition": "",
                                "title": "I.C.E. - Sample1",
                                "author": "",
                                "publisher": "",
                                "shortname": "sn_e32f",
                                "remarks": {
                                    "@path": "remarks.s9ml"
                                },
                                "pubdate": "Publish Date",
                                "version": "Version",
                                "revision": "Revision",
                                "s9version": "s9version",
                                "productid": "Product ID",
                                "bundleconfig": {
                                    "@path": "config.s9ml"
                                },
                                "reflowable": "true",
                                "subtitle": "",
                                "@thumbnailpath": "../img/toc_thumbs/cover.png"
                            },
                            "spine": {
                                "unit": {
                                    "title": "",
                                    "chapter": {
                                        "title": "Sample Chapter",
                                        "exhibit": [],
                                        "@data-uuid": "c1d19c39d808449cbf19828f87587a3a",
                                        "@designation": "Chapter",
                                        "@enumeration": "1",
                                        "@thumbnailpath": "../img/.templates/chapter_thumbnail.png",
                                        "@sandbox": "false"
                                    },
                                    "@designation": "",
                                    "@enumeration": "",
                                    "@data-uuid": "87a46ea01fe4432e8c3bbf6c8e230bed"
                                }
                            },
                            "@xmlns": "http://www.standardnine.com/s9ml",
                            "@data-uuid": "8c41958094cb414abaefd924fa7de26b"
                        }
                    };

		//Overriding default variables
		this.settings = $.extend(true, {}, defaults, options);

		//Creating load method to load the content to the server
		this.getToc = function(){
            return json2xml(this.settings);
		}
		return this;
	}
})(jQuery)
