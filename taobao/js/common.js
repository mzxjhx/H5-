//获取兄弟元素
function siblings(elm) {
	var a = [];
	var p = elm.parentNode.children;
	for(var i =0,pl= p.length;i<pl;i++) {
	if(p[i] !== elm) a.push(p[i]);
	}
	return a;
}


/**
 * 
 * @param {*} className 
 */
function classRegExp(className) {
    return new RegExp('(^|\\s)' + className + '($|\\s)');
}

  /**
   * str包含空格则throw error
   *
   * @param {string} str
   *         The string to check for whitespace.
   *
   * @throws {Error}
   *         Throws an error if there is whitespace in the string.
   *
   */
function throwIfWhitespace(str){
    if(/\s/.test(str)){
        throw new Error('error');
    }
}

/**
 * 
 * @param {*} element 
 * @param {*} classToCheck 
 */
function hasClass(element, classToCheck) {
    if (element.classList) {
        return element.classList.contains(classToCheck);
    }
    return classRegExp(classToCheck).test(element.className);
}

/**
 * 
 * @param {*} element 
 * @param {*} classToAdd 
 */
function addClass(element, classToAdd) {
    if (element.classList) {
        element.classList.add(classToAdd);
    } else if (!hasClass(element, classToAdd)) {
        element.className = (element.className + " " + classToAdd).trim();
    }
    return element;
}

/**
 * 
 * @param {*} element 
 * @param {*} classToRemove 
 */
function removeClass(element,classToRemove){
    if (element.classList) {
        element.classList.remove(classToRemove);
    }else {
        throwIfWhitespace(classToRemove);
        element.className = element.className.split(/\s+/).fliter((c)=>{
            return c!==classToRemove;
        }).join(' ');
    }
}
