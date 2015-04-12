/*************************************************************************
 * ParseWiki.js - Copywrite (c) 2009 James Eggers
 * Released under the Common Development and Distribution License
 * For more information about the license, please visit
 * http://en.wikipedia.org/wiki/Common_Development_and_Distribution_License
 *************************************************************************/

// Formatting
var boldPattern = /\*(.*?)\*/g;
var boldReplacement = "<b>$1</b>";

var italicsPattern = /_(.*?)_/g;
var italicsReplacement = "<i>$1</i>";

var underlinePattern = /\+(.*?)\+/g;
var underlineReplacement = "<u>$1</u>";

var heading1Pattern = /^!\s(.*)$/;
var heading1Replacement = "<h1>$1</h1>";

var heading2Pattern = /^!{2}\s(.*)$/;
var heading2Replacement = "<h2>$1</h2>";

var heading3Pattern = /^!{3}\s(.*)$/;
var heading3Replacement = "<h3>$1</h3>";

var heading4Pattern = /^!{4}\s(.*)$/;
var heading4Replacement = "<h4>$1</h4>";

var heading5Pattern = /^!{5}\s(.*)$/;
var heading5Replacement = "<h5>$1</h5>";

var heading6Pattern = /^!{6}\s(.*)$/;
var heading6Replacement = "<h6>$1</h6>";

/// Horizontal Rule
var hrPattern = /^-{4}$/;
var hrReplacement = "<hr />";

// Anchors/Internal Links
var anchorPattern = /\[a:(.*?)\]/;
var anchorReplacement = "<a name=\"$1\"></a>";

var goToPattern = /\[goto:(.*?)\|(.*?)\]/;
var goToReplacement = "<a href=\"#$1\">$2</a>";

// External Links
var urlPattern = /\[url:(.*?)\|(.*?)\]/;
var urlReplacement = "<a href=\"$1\">$2</a>";

var unorderedListDepth = 0;
var orderedListDepth = 0;

function ParseWiki(inputData)
{
    var output = "";
    var lines = inputData.split("\n");
    
    for (var i=0; i<lines.length; i++)
    {
        lines[i] = ReplaceBold(lines[i]);
        lines[i] = ReplaceItalics(lines[i]);
        lines[i] = ReplaceUnderline(lines[i]);
        lines[i] = ReplaceHeading1(lines[i]);
        lines[i] = ReplaceHeading2(lines[i]);
        lines[i] = ReplaceHeading3(lines[i]);
        lines[i] = ReplaceHeading4(lines[i]);
        lines[i] = ReplaceHeading5(lines[i]);
        lines[i] = ReplaceHeading6(lines[i]);
        lines[i] = ReplaceHorizontalRule(lines[i]);
        lines[i] = ReplaceLists(lines[i]);
        lines[i] = ReplaceBlankLines(lines[i]);
        lines[i] = ReplaceAnchor(lines[i]);
        lines[i] = ReplaceGoTo(lines[i]);
        lines[i] = ReplaceLink(lines[i]);
        output += lines[i] + "\n";
    } 
    
    return output;    
}

function ReplaceBold(data)
{    
    return data.replace(boldPattern, boldReplacement);
}

function ReplaceItalics(data)
{    
    return data.replace(italicsPattern, italicsReplacement);
}

function ReplaceUnderline(data)
{    
    return data.replace(underlinePattern, underlineReplacement);
}

function ReplaceHeading1(data)
{
    return data.replace(heading1Pattern, heading1Replacement);
}

function ReplaceHeading2(data)
{
    return data.replace(heading2Pattern, heading2Replacement);
}

function ReplaceHeading3(data)
{
    return data.replace(heading3Pattern, heading3Replacement);
}

function ReplaceHeading4(data)
{
    return data.replace(heading4Pattern, heading4Replacement);
}

function ReplaceHeading5(data)
{
    return data.replace(heading5Pattern, heading5Replacement);
}

function ReplaceHeading6(data)
{
    return data.replace(heading6Pattern, heading6Replacement);
}

function ReplaceHorizontalRule(data)
{
    return data.replace(hrPattern, hrReplacement);
}

function ReplaceAnchor(data)
{
    return data.replace(anchorPattern, anchorReplacement);
}

function ReplaceGoTo(data)
{
    return data.replace(goToPattern, goToReplacement);
}

function ReplaceLink(data)
{
    return data.replace(urlPattern, urlReplacement);
}

function ReplaceLists(data)
{
    var output = "";
    var unorderedPattern = /^\*\s(.*)$/;
    var orderedPattern = /^\#\s(.*)$/;
    
    if (unorderedListDepth > 0 && data.match(unorderedPattern) == null)
    {
        unorderedListDepth = unorderedListDepth - 1;
        output += "</ul>";        
    }
    
    if (orderedListDepth > 0 && data.match(orderedPattern) == null)
    {
        orderedListDepth = orderedListDepth - 1;
        output += "</ol>";        
    } 
    
    if (unorderedListDepth == 0 && data.match(unorderedPattern) != null)
    {
        output += "<ul>";
        unorderedListDepth += 1;
    }
    
    if (unorderedListDepth > 0 && data.match(unorderedPattern) != null)
    {
        output = output + data.replace(unorderedPattern, "<li>$1</li>");
    } 
    
    if (orderedListDepth == 0 && data.match(orderedPattern) != null)
    {
        output += "<ol>";
        orderedListDepth += 1;
    }
    
    if (orderedListDepth > 0 && data.match(orderedPattern) != null)
    {
        output = output + data.replace(orderedPattern, "<li>$1</li>");
    } 
    
    if (output == "</ul>")
    {
        output += data;
    }
    
    if (output == "</ol>")
    {
        output += data;
    }
    
    if (output.length == 0)
    {
        output += data;
    }
    
    return output;
}

function ReplaceBlankLines(data)
{
    if (data.length == 0)
    {
        data = "<br />";
    }
    
    return data;
}