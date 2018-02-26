(function(){
	$.fn.utilities = function(){
		this.toBoolean = function(flag, defaultValue){
            return ((_.isUndefined(flag)) ? defaultValue : flag);
        }
		this.enable = function(flag){
            if(flag){
                $(this)
                        .removeAttr('disabled');
            }else{
                $(this)
                        .attr('disabled', 'disabled');
            }
			return this;
		}
        this.isDisable = function(){
            var disabled = $(this).attr('disabled');
            return (disabled == 'disabled' || disabled);
        }
        this.generateUUID = function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
        this.addTagClosing = function(html, tag){
            var startIndex = -1;
            while(html.indexOf('<' + tag, startIndex) != -1){
                var foundAt = html.indexOf('<' + tag, startIndex);
                var closingAt = html.indexOf('>', foundAt);
                html = html.substring(0, closingAt) + '/' + html.substring(closingAt);
                startIndex = closingAt;
            }
            return html;
        }
        this.addTagsClosing = function(html, tags){
            for(var i =0; i<tags.length; i++){
                html = this.addTagClosing(html, tags[i]);
            }
            return html;
        }
        this.updateBold = function(){
            var elementFontFamily = $(this).css('font-family').toLowerCase();
            var isBold = (elementFontFamily.indexOf('bold') != -1 || elementFontFamily.indexOf('bld') != -1);
            if(isBold){
                var selectredElementHtml = $(this).prop('outerHTML');
                var popUpmatched = selectredElementHtml.replace(/\<span(.+?)\>(.+?)<\/span\>/, '\<b\>$2\<\/b\>');
                this.outerHTML = popUpmatched;
            }
        }
        this.updateItalic = function(){
            var elementFontFamily = $(this).css('font-family').toLowerCase();
            var isItalic = (elementFontFamily.indexOf('italic') != -1);
            if(isItalic){
                var selectredElementHtml = $(this).prop('outerHTML');
                var popUpmatched = selectredElementHtml.replace(/\<span(.+?)\>(.+?)<\/span\>/, '\<i\>$2\<\/i\>');
                this.outerHTML = popUpmatched;
            }
        }
        this.updateTag = function(selector, identifier, tag1, tag2){
            var selectedHtmlElement = $(selector).prop('outerHTML');

            var elementFontFamily = $(selector).css('font-family').toLowerCase();
            var typeMatched = (elementFontFamily.indexOf(identifier) != -1);
            if(typeMatched){
                
                
                var pattern = new RegExp('\<' + tag1 + '(.*?)\>(.+?)<\/' + tag1 + '\>');
                var replaceS = '\<' + tag2 + '\>$2\<\/' + tag2 + '\>';
                var updatedContent = selectedHtmlElement.replace(pattern, replaceS);

                return (updatedContent);
            }
            return selectedHtmlElement;
        }
        this.updateBoldItalic = function(){
            var subSpan = $(this).find('span');
            if(subSpan.length > 0){
                subSpan.each(function(index) {
                    var updatedHTML = $(this)
                                            .utilities()
                                            .updateBoldItalic()
                     $(this)
                            .replaceWith(updatedHTML);
                })
            }
            var clonedOuterHTML = $(this).clone()[0].outerHTML;

            this.replaceWith(this.updateTag(this, 'bold', 'span', 'b'));
            this.replaceWith(this.updateTag(this, 'bld', 'span', 'b'));
            this.replaceWith(this.updateTag(this, 'italic', 'span', 'i'));
            this.replaceWith(this.updateTag(this, 'it', 'span', 'i'));

            var toReturn = this[0].outerHTML;
            
            this.replaceWith(clonedOuterHTML)
            
            return toReturn;
        }
        this.stripChildTagProperties = function(){
            var attributes = $(this)[0].attributes;
            while(attributes.length > 0){
                $(this).removeAttr(attributes[0].nodeName);
            }
            return $(this)[0].outerHTML;
        }
        this.removeTag = function(tagToRemove){
            var clonedOuterHTML = $(this).clone()[0].outerHTML;

            if($(this)[0].nodeName.toLowerCase() == tagToRemove.toLowerCase()){
                return $(this)[0].innerHTML;
            }else{
                return this;
            }
            this.replaceWith(clonedOuterHTML)
        }
        this.getTagName = function(){
            return $(this)
                            .prop("tagName").toLowerCase();
        }
        this.objectToXml = function(obj) {
            var xml = '';

            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }

                if (obj[prop] == undefined){
                    continue;
                }

                xml += "<" + prop + ">";
                if (typeof obj[prop] == "object"){
                    xml += objectToXml(new Object(obj[prop]));
                }else{
                    xml += obj[prop];

                }
                xml += "<!--" + prop + "-->";
            }

            return xml;
        }
        this.batchReplace = function(targetS, replacerO){
            for(var i in replacerO){
                var searchS     = new RegExp(replacerO[i].original, 'igm');
                var replaceS    = replacerO[i].replace;
                targetS         = targetS.replace(searchS, replaceS);
            }
            return targetS;
        }
        this.getCssBackgroundUrl = function(target){
            var urlS = $(this).css('background-image');
            
            var urlRe = /url\("(.*)"\)/gi;
            var result = urlRe.exec(urlS);
            return (result == null) ? '' : result[1];
        }
        return this;
	}
    
}(jQuery));