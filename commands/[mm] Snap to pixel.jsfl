﻿/* * Copyright (c) 2007 Squidder.com *  * Permission is hereby granted, free of charge, to any person obtaining a copy * of this software and associated documentation files (the "Software"), to deal * in the Software without restriction, including without limitation the rights * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell * copies of the Software, and to permit persons to whom the Software is * furnished to do so, subject to the following conditions: *  * The above copyright notice and this permission notice shall be included in * all copies or substantial portions of the Software. *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN * THE SOFTWARE. */var flash_doc = fl.getDocumentDOM();var flash_lib = flash_doc.library;var flash_tl  = flash_doc.getTimeline();var elementsModified = 0;var confirmation = true;if ( flash_tl.layerCount * flash_tl.frameCount >  100 ) {		confirmation = confirm( "SnapToPixel\n\nBecause of the large number of frames, this process may take some time. Are you sure you want to continue?" );}if ( confirmation ) {				for ( var i = 0 ; i < flash_tl.layerCount; i ++ ) {				for ( var j = 0 ; j < flash_tl.layers[ i ].frameCount ; j ++ ) {						var currFrame = flash_tl.layers[ i ].frames[ j ];						if ( j == currFrame.startFrame ) { // Only run on keyframes.							for ( var k = 0 ; k < currFrame.elements.length ; k ++ ) {										elementsModified += snapPixels( currFrame.elements[ k ] );				}						}					}			}}/*if ( elementsModified == 0 ) {		alert( "SnapToPixel\n\nNo instances were modified" );	} else if ( elementsModified == 1 ){		alert( "SnapToPixel\n\n1 instances was modified" );	} else {		alert( "SnapToPixel\n\n" + elementsModified + " instances were modified" );}*/function snapPixels( element ) {		var oldx = element.x;	var oldy = element.y;		var newX;	var newY;		// oddly, more reliable than Math.round.	if ( element.x - Math.floor( element.x ) < .5 ) {				newX = Math.floor( element.x );			} else {		newX = Math.ceil( element.x );	}		if ( element.y - Math.floor( element.y ) < .5 ) {		newY = Math.floor( element.y );	} else {		newY = Math.ceil( element.y );	}		// Fix for the weird offset that flash applies to the element	element.x = newX;	element.x = element.x + (newX - element.x) * 2;		element.y = newY;	element.y = element.y + (newY - element.y) * 2;		if ( oldx - element.x != 0 || oldy - element.y != 0 ) {		return 1;	}	return 0;}