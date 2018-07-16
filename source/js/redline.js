"use strict";

(function() {
  let whRedline = e => {
    let w = e.offsetWidth;
    let h = e.offsetHeight;
    let coords = e.getBoundingClientRect();
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;

    //if body is position relative/absolute and has a margin set to it. Have to compensate
    let body = window.getComputedStyle(document.body, null);
    let pos = body.getPropertyValue("position");

    if (pos == "relative" || pos == "absolute") {
      scrollY -= parseFloat(body.getPropertyValue("margin-top")) || 0;
      scrollX -= parseFloat(body.getPropertyValue("margin-left")) || 0;
    }

    let box = document.createElement("div");

    //box.style.position = 'absolute';
    //box.style.zIndex = 1234567890;
    box.style.top = scrollY + coords.top + "px";
    box.style.left = scrollX + coords.left + "px";

    box.style.width = coords.width + "px";
    box.style.height = coords.height + "px";

    box.dataset.width = coords.width;
    box.dataset.height = coords.height;
    box.dataset.value =
      Math.round(coords.width) + " x " + Math.round(coords.height);

    //box.style.background = 'rgba(0,0,150,.6)';

    box.className = "prezeplin";

    document.body.appendChild(box);

    e.addEventListener("click", event => {
      stylePanel(e);
    });
  };

  let disRedline = (e, i) => {
    let coords = e.getBoundingClientRect();

    let redline = document.getElementsByClassName("prezeplin")[i - 1];

    if (!redline) {
      return;
    }

    let bounds = redline.getBoundingClientRect();

    let y1 = bounds.top;
    let y2 = bounds.bottom;
    let x1 = bounds.left;
    let x2 = bounds.right;

    let y1b = coords.top;
    let y2b = coords.bottom;
    let x1b = coords.left;
    let x2b = coords.right;

    let dy = 0;
    let dx = 0;
    let ty = 0;
    let tx = 0;

    if (y1b >= y2) {
      dy = y1b - y2;
      ty = y2;
    } else if (y1b >= y1) {
      dy = y1b - y1;
      ty = y1;
    } else if (y1 >= y2b) {
      dy = y1 - y2b;
      ty = y2b;
    } else if (y1 > y1b) {
      dy = y1 - y1b;
      ty = y1b;
    } else {
      console.warn("dist y issue");
    }

    if (x1b >= x2) {
      dx = x1b - x2;
      tx = x2;
    } else if (x1b >= x1) {
      dx = x1b - x1;
      tx = x1;
    } else if (x1 > x2b) {
      dx = x1 - x2b;
      tx = x2b;
    } else if (x1 > x1b) {
      dx = x1 - x1b;
      tx = x1b;
    } else {
      console.warn("dist x issue");
    }

    console.log(tx, ty);
    // let dist = document.createElement('div');
    // let info = document.createElement('div');
    // dist.className = 'distance';
    // dist.style.position = 'absolute';
    // dist.style.top = scrollY +  ty + 'px';
    // dist.style.left = scrollX +  tx + 'px';
    //
    // dist.style.width = dx + 'px';
    // dist.style.height = dy + 'px';

    dx = Math.round(dx);
    dy = Math.round(dy);

    // dist.dataset.x = dx;
    // dist.dataset.y = dy;
    // dist.dataset.value = 'x: ' + dx + ' - y: ' + Math.round(dy);

    ////
    if (dy > 0) {
      let yline = document.createElement("div");
      let f1 = document.createElement("div");
      let f2 = document.createElement("div");
      yline.className = "distance2 Ry";

      yline.style.height = dy + "px";
      yline.style.top = scrollY + ty + "px";
      yline.style.left = coords.left + coords.width / 2 + scrollX - 1 + "px";

      yline.dataset.value = dy;

      yline.appendChild(f1);
      yline.appendChild(f2);

      document.body.appendChild(yline);
    }

    if (dx > 0) {
      let xline = document.createElement("div");
      let f1 = document.createElement("div");
      let f2 = document.createElement("div");
      xline.className = "distance2 Rx";

      xline.style.width = dx + "px";
      xline.style.top = coords.top + coords.height / 2 + scrollY - 1 + "px";
      xline.style.left = scrollX + tx + "px";

      xline.dataset.value = dx;

      xline.appendChild(f1);
      xline.appendChild(f2);

      document.body.appendChild(xline);
    }

    if ((y1 > y1b && y2 < y2b) || (y1 < y1b && y2 > y2b)) {
      console.log("vertically inside");
      let bottomy = Math.abs(y2 - y2b);

      if (bottomy > 0.5) {
        let y2line = document.createElement("div");
        let f1 = document.createElement("div");
        let f2 = document.createElement("div");

        let iy = y2 < y2b ? y2 : y2b;

        y2line.className = "distance2 Ry2 Ry";

        y2line.style.height = bottomy + "px";
        y2line.style.top = scrollY + iy + "px";
        y2line.style.left = coords.left + coords.width / 2 + scrollX - 1 + "px";

        y2line.dataset.value = Math.round(bottomy);

        y2line.appendChild(f1);
        y2line.appendChild(f2);

        document.body.appendChild(y2line);
      }
    }

    if ((x1 > x1b && x2 < x2b) || (x1 < x1b && x2 > x2b)) {
      console.log("horz inside");
      let rightx = Math.abs(x2 - x2b);
      if (rightx > 0.5) {
        let x2line = document.createElement("div");
        let f1 = document.createElement("div");
        let f2 = document.createElement("div");
        x2line.className = "distance2 Rx Rx2";

        let ix = x2 < x2b ? x2 : x2b;

        x2line.style.width = rightx + "px";
        x2line.style.top = coords.top + coords.height / 2 + scrollY - 1 + "px";
        x2line.style.left = scrollX + ix + "px";

        x2line.dataset.value = Math.round(rightx);

        x2line.appendChild(f1);
        x2line.appendChild(f2);

        document.body.appendChild(x2line);
      }
    }

    console.log(dy);
    console.log(dx);
  };

  let stylePanel = e => {
    let computed = window.getComputedStyle(e, null);
    let redlines = {};
    let coords = e.getBoundingClientRect();

    redlines.elementname = e.dataset
      ? e.dataset.name || e.className || e.tagName
      : e.className || e.tagName;
    redlines.width = coords.width;
    redlines.height = coords.height;

    redlines.widthCSS = computed.getPropertyValue("width");
    redlines.heightCSS = computed.getPropertyValue("height");

    redlines.widthCSS =
      redlines.widthCSS == "auto" ? "none" : redlines.widthCSS;
    redlines.heightCSS =
      redlines.heightCSS == "auto" ? "none" : redlines.heightCSS;

    let opacity = computed.getPropertyValue("opacity");
    redlines.opacity = opacity != "1" ? Number(opacity) * 100 + "%" : "";

    redlines.showopacity = redlines.opacity == "" ? "none" : "";

    redlines["font-size"] = computed.getPropertyValue("font-size");
    redlines["font-family"] = computed.getPropertyValue("font-family");
    redlines["font-weight"] = computed.getPropertyValue("font-weight");
    redlines["font-color"] = computed.getPropertyValue("color");

    redlines.fontRGB = redlines["font-color"];

    let bt = parseFloat(computed.getPropertyValue("border-top")) || 0;
    let br = parseFloat(computed.getPropertyValue("border-right")) || 0;
    let bb = parseFloat(computed.getPropertyValue("border-bottom")) || 0;
    let bl = parseFloat(computed.getPropertyValue("border-left")) || 0;

    let pt = parseFloat(computed.getPropertyValue("padding-top")) || 0;
    let pr = parseFloat(computed.getPropertyValue("padding-right")) || 0;
    let pb = parseFloat(computed.getPropertyValue("padding-bottom")) || 0;
    let pl = parseFloat(computed.getPropertyValue("padding-left")) || 0;

    let mt = parseFloat(computed.getPropertyValue("margin-top")) || 0;
    let mr = parseFloat(computed.getPropertyValue("margin-right")) || 0;
    let mb = parseFloat(computed.getPropertyValue("margin-bottom")) || 0;
    let ml = parseFloat(computed.getPropertyValue("margin-left")) || 0;

    if (pt) {
      redlines["padding-top"] = pt;
    }
    if (pr) {
      redlines["padding-right"] = pr;
    }
    if (pb) {
      redlines["padding-bottom"] = pb;
    }
    if (pl) {
      redlines["padding-left"] = pl;
    }

    if (bt) {
      redlines["border-top"] = bt;
    }
    if (br) {
      redlines["border-right"] = br;
    }
    if (bb) {
      redlines["border-bottom"] = bb;
    }
    if (bl) {
      redlines["border-left"] = bl;
    }

    if (mt) {
      //boxshadow += '0 ' + -mt + 'px rgba(255,135,0,.5),';
      redlines["margin-top"] = mt;
    }

    if (mr) {
      //boxshadow += mr + 'px 0 rgba(255,135,0,.5),';
      redlines["margin-right"] = mr;
    }

    if (mb) {
      //boxshadow += '0 ' + mb + 'px rgba(255,135,0,.5),';
      redlines["margin-bottom"] = mb;
    }

    if (ml) {
      //boxshadow += -ml + 'px 0 rgba(255,135,0,.5)';
      redlines["margin-left"] = ml;
    }
    let fillcolor = computed.getPropertyValue("background-color");

    let spectrumfill = whatcolor(fillcolor);
    let spectrumfont = whatcolor(redlines.fontRGB);

    redlines.fillColor = fillcolor;

    redlines.rgbfill = fillcolor;
    redlines.hexfill =
      spectrumfill.indexOf("transparent") < 0 ? rgbtohex(fillcolor) : "na";
    redlines.fillcolorname = colorNames.get(redlines.hexfill);

    redlines.fill = spectrumfill.indexOf("transparent") < 0 ? "block" : "none";

    redlines.fontHex =
      spectrumfont !== "transparent" ? rgbtohex(redlines.fontRGB) : "na";
    redlines.fontcolorname = colorNames.get(redlines.fontHex);
    redlines.fontSize = redlines["font-size"];
    redlines.fontWeight = redlines["font-weight"];

    redlines.fontType = copy[redlines.fontSize] || "Unknown";

    /// add to panel
    redlines.lineHeight = computed.getPropertyValue("line-height");
    //redlines.letterSpacing = computed.getPropertyValue('letter-spacing');
    redlines.fontFamily = computed.getPropertyValue("font-family");
    redlines.opentype = computed.getPropertyValue("font-feature-settings");

    redlines.font = e.innerText != "" ? "block" : "none";

    redlines.hasOpentype = redlines.opentype == "normal" ? "none" : "block";

    //redlines.fontInfo = redlines['font-size'] + ' ' + redlines['font-color'];
    redlines.borderLeft = bl;
    redlines.borderRight = br;
    redlines.borderTop = bt;
    redlines.borderBottom = bb;
    redlines.borderLeftColor = computed.getPropertyValue("border-left-color");
    redlines.borderRightColor = computed.getPropertyValue("border-right-color");
    redlines.borderTopColor = computed.getPropertyValue("border-top-color");
    redlines.borderBottomColor = computed.getPropertyValue(
      "border-bottom-color"
    );
    redlines.borderRadiusTopLeft = computed.getPropertyValue(
      "border-top-left-radius"
    );
    redlines.borderRadiusTopRight = computed.getPropertyValue(
      "border-top-right-radius"
    );
    redlines.borderRadiusBottomLeft = computed.getPropertyValue(
      "border-bottom-left-radius"
    );
    redlines.borderRadiusBottomRight = computed.getPropertyValue(
      "border-bottom-right-radius"
    );
    redlines.borderColorTop = bt
      ? computed.getPropertyValue("border-top-color")
      : null;
    redlines.borderColorRight = br
      ? computed.getPropertyValue("border-right-color")
      : null;
    redlines.borderColorBottom = bb
      ? computed.getPropertyValue("border-bottom-color")
      : null;
    redlines.borderColorLeft = bl
      ? computed.getPropertyValue("border-left-color")
      : null;
    redlines.borderStyleTop = bt
      ? computed.getPropertyValue("border-top-style")
      : null;
    redlines.borderStyleRight = br
      ? computed.getPropertyValue("border-right-style")
      : null;
    redlines.borderStyleBottom = bb
      ? computed.getPropertyValue("border-bottom-style")
      : null;
    redlines.borderStyleLeft = bl
      ? computed.getPropertyValue("border-left-style")
      : null;

    redlines.borderColor =
      redlines.borderColorTop ||
      redlines.borderColorRight ||
      redlines.borderColorBottom ||
      redlines.borderColorLeft ||
      "transparent";
    redlines.borderSwatch =
      redlines.borderColor && redlines.borderColor != "transparent"
        ? whatcolor(redlines.borderColor)
        : "--";
    redlines.borderColorHex =
      redlines.borderColor && redlines.borderColor != "transparent"
        ? rgbtohex(redlines.borderColor)
        : "--";
    redlines.borderStyle =
      redlines.borderStyleTop ||
      redlines.borderStyleRight ||
      redlines.borderStyleBottom ||
      redlines.borderStyleLeft ||
      "--";

    redlines.border =
      redlines.borderLeft ||
      redlines.borderRight ||
      redlines.borderTop ||
      redlines.borderBottom
        ? "block"
        : "none";

    redlines.borderCSS = computed.getPropertyValue("border");

    redlines.borderRadius =
      redlines.borderRadiusTopLeft != "0px" ||
      redlines.borderRadiusTopRight != "0px" ||
      redlines.borderRadiusBottomLeft != "0px" ||
      redlines.borderRadiusBottomRight != "0px" ||
      redlines.border == "block"
        ? "block"
        : "none";
    redlines.borderRadiusCSS = computed.getPropertyValue("border-radius");

    let shadow = computed.getPropertyValue("box-shadow");
    redlines.dropShadow = shadow;

    let boxshadow = shadow != "none" ? shadow.split("px, ") : [];
    let boxhtml = "";

    for (let i = 0; i < boxshadow.length; i++) {
      let shadowcolor = boxshadow[i].replace(/px/gi, "");
      let box = shadowcolor.replace(/rgb(.*?)\)/i, "").trim();
      shadowcolor = shadowcolor.replace(box, "");
      box = box.split(" ");

      boxhtml += "<div>";
      boxhtml +=
        "<div class=item><span class=label>Color</span> <span class=value>" +
        shadowcolor +
        "</span></div><br>";
      boxhtml +=
        "<div class=item><span class=label>Offset-X</span> <span class=value>" +
        box[0] +
        "</span></div>";
      boxhtml +=
        "<div class=item><span class=label>Offset-Y</span> <span class=value>" +
        box[1] +
        "</span></div><br>";
      boxhtml +=
        "<div class=item><span class=label>Blur</span> <span class=value>" +
        box[2] +
        "</span></div>";
      boxhtml +=
        "<div class=item><span class=label>Spread</span> <span class=value>" +
        box[3] +
        "</span></div>";
      boxhtml += "</div>";
    }

    redlines.boxshadow = boxhtml;

    /*let shadow = computed.getPropertyValue('box-shadow');
          let shadowcolor = shadow;
          shadow = shadow.replace(/rgb(.*?)\)/i, '').trim();
          shadowcolor = shadowcolor.replace(shadow, '');
          shadow = shadow.split(' ');

          redlines.shadowColor = shadowcolor;
          redlines.shadowX = shadow[0];
          redlines.shadowY = shadow[1];
          redlines.shadowBlur = shadow[2];
          redlines.shadowSpread = shadow[3];*/

    redlines.paddingLeft = pl;
    redlines.paddingRight = pr;
    redlines.paddingTop = pt;
    redlines.paddingBottom = pb;

    redlines.padding = pl || pr || pt || pb ? "block" : "none";

    redlines.marginLeft = ml;
    redlines.marginRight = mr;
    redlines.marginTop = mt;
    redlines.marginBottom = mb;

    redlines.margin = ml || mr || mt || mb ? "block" : "none";

    redlines.negitive = [];

    if (redlines.marginTop < 0) {
      redlines.negitive.push(
        "inset 0 " + Math.abs(redlines.marginTop) + "px rgba(255, 0, 0, 0.5)"
      );
    }
    if (redlines.marginBottom < 0) {
      redlines.negitive.push(
        "inset 0 " + redlines.marginBottom + "px rgba(255, 0, 0, 0.5)"
      );
    }
    if (redlines.marginLeft < 0) {
      redlines.negitive.push(
        "inset " + Math.abs(redlines.marginLeft) + "px 0 rgba(255, 0, 0, 0.5)"
      );
    }
    if (redlines.marginRight < 0) {
      redlines.negitive.push(
        "inset " + redlines.marginRight + "px 0 rgba(255, 0, 0, 0.5)"
      );
    }

    redlines.negitive.join(",");

    console.log(redlines);

    if (redlines.negitive) {
      //wrap.style.boxShadow = redlines.negitive;
      redlines.negitive += ", inset 0 0 0 1px #e1e1e1";
    }

    let template = paneltemplate; //document.getElementById('redlinepaneltemplate').innerHTML;

    template = template.elemental(redlines);

    var panel = document.getElementsByClassName("redlinepanel")[0];
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "redlinepanel";
      document.body.appendChild(panel);
    } else {
      panel.style.visibility = "visible";
    }

    panel.innerHTML = template;

    const close = panel.getElementsByClassName("RLeject")[0];
    close.addEventListener("click", event => {
      eject();
    });
  };

  let paneltemplate = `<div class=infopanel>
     <div class=paneldrag>
       <div class="prismvhandle">
           <div class="prismvh"></div>
           <div class="prismvh"></div>
           <div class="prismvh"></div>
           <div class="prismvh"></div>
           <div class="prismvh"></div>
           <div class="prismvh"></div>
       </div>
     </div>
     <div class=RLscroll>
       <div class=sub style="padding:8px 24px;">
         <button class="pausezeplin pausezeplin on" id=pausezeplin title="Pause redlining (Esc)" style="background:transparent;margin-left:-12px !important;">
           <div class=toggle2>
               <div class=trackwrap2>
                   <div class=toggle2handle></div>
                   <div class=togglefillwrap>
                     <div class=togglefill></div>
                   </div>
               </div>
           </div>
         </button><button class="RLeject" style="margin-right:-8px !important;">Close</button>
       </div>
       <div class="sub name">
         <h4 style="margin-bottom:0;">Info</h4>
         <div>
           <div class=item><span class=label>Width</span> <span class=value>{width}px</span></div>
           <div class=item><span class=label>Height</span> <span class=value>{height}px</span></div>
         </div>
         <div class=item style="display:{showopacity}">
           <div class=item><span class=label>Opacity</span> <span class=value>{opacity}</span></div>
         </div>
         <div class=item><span class=label>Class</span>  <span class=value>{elementname}</span></div>
       </div>
       <div class="sub fillinfo" style="display:{fill};">
         <h4>Fill</h4>
         <span class=colorpreview style="margin-bottom:4px;width:100%;height:32px;display:inline-block;background-color:{fillColor};vertical-align:middle;border-radius:2px;box-shadow:0 0 0 1px rgba(0,0,0,.05);"></span>
         <div class=item><span class=label>RGB</span> <span class=value>{rgbfill}</span></div>
         <div class=item><span class=label>Hex</span> <span class=value>{hexfill}</span></div>
         <div class=item><span class=label>Color Name</span> <span class=value>{fillcolorname}</span></div>
       </div>
       <div class="sub typeinfo" style="display:{font};">
         <h4>Font</h4>
         <span class=fontpreview style="line-height:1;margin-bottom:4px;display:block;background:{fillColor};padding:4px;border-radius:2px;font-size:{font-size};color:{fontRGB};font-weight:{font-weight};vertical-align:middle;box-shadow:0 0 0 1px rgba(0,0,0,.05);min-width: 32px;text-align: center;box-sizing:border-box;">Aa</span><span class=fontvalue>
           <div class=item><span class=label>Typeface</span> <span class=value>{fontFamily}</span></div>
           <div class=item><span class=label>Size</span> <span class=value>{fontSize}</span></div>
           <div class=item><span class=label>Weight</span> <span class=value>{fontWeight}</span></div>
           <div class=item><span class=label>RGB</span> <span class=value>{fontRGB}</span></div>
           <div class=item><span class=label>Hex</span> <span class=value>{fontHex}</span></div>
           <div class=item><span class=label>Color Name</span> <span class=value>{fontcolorname}</span></div>
           <div class=item><span class=label>Line Height</span> <span class=value>{lineHeight}</span></div>
           <div class=item><span class=label>OpenType</span> <span class=value>{opentype}</span></div>
           <div class=item><span class=label>Font Type</span> <span class=value>{fontType}</span></div>
         </span>
       </div>
       <div class="sub borderinfo" style="display:{border};">
         <h4>Border</h4>
         <div style="vertical-align:top;">
           <div class=borderpreview style="width:100%;height:40px;box-sizing:border-box;border-left-width:{borderLeft}px;border-right-width:{borderRight}px;border-bottom-width:{borderBottom}px;border-top-width:{borderTop}px;border-left-color:{borderLeftColor};border-right-color:{borderRightColor};border-top-color:{borderTopColor};border-bottom-color:{borderBottomColor};border-style:{borderStyle};margin-bottom:4px;">
             <span class=borderleft>{borderLeft}</span>
             <span class=borderright>{borderRight}</span>
             <span class=borderbottom>{borderBottom}</span>
             <span class=bordertop>{borderTop}</span>
           </div>
           <div class=info>
             <div class=item><span class=label>Color</span> <span class=value><span style="display:inline-block;height:16px;width:24px;background:{borderColor};border-radius:2px;"></span></span></div>
             <div class=item><span class=label>RGB</span> <span class=value>{borderColor}</span></div>
             <div class=item><span class=label>Hex</span> <span class=value>{borderColorHex}</span></div>
             <div class=item><span class=label>Style</span> <span class=value>{borderStyle}</span></div>
           </div>
         </div>
       </div>
       <div class="sub borderinfo" style="display:{borderRadius};">
         <h4>Border Radius</h4>
         <span style="display:inline-block;margin-bottom:4px;margin-left:32px;">
             <div style="border-width:2px;font-size:10px;border-color:#666;border-radius:{borderRadiusTopLeft} 0 0 0;border-style:solid;width:16px;height:16px;white-space:nowrap;box-sizing:border-box;padding:0 0 0 ;display:inline-block;border-right:none;border-bottom:none;margin-right:0;text-align:left;text-indent:-30px;line-height: 0;">{borderRadiusTopLeft}</div><div style="border-width:2px;font-size:10px;border-color:#666;border-radius:0 {borderRadiusTopRight} 0 0;border-style:solid;width:16px;height:16px;white-space:nowrap;box-sizing:border-box;padding:0 0 0 0;text-align:right;text-indent:24px;display:inline-block;border-left:none;border-bottom:none;line-height: 0;">{borderRadiusTopRight}</div>
             <div style="height:0;"></div>
             <div style="border-width:2px;font-size:10px;border-color:#666;border-radius:0 0 0 {borderRadiusBottomLeft};border-style:solid;width:16px;height:16px;white-space:nowrap;box-sizing:border-box;padding:0 0 0 0;text-align:left;text-indent:-30px;display:inline-block;border-top:none;border-right:none;margin-right:0;line-height:24px;">{borderRadiusBottomLeft}</div><div style="border-width:2px;font-size:10px;border-color:#666;border-radius:0 0 {borderRadiusBottomRight} 0;border-style:solid;width:16px;height:16px;width:{radiusHeight};height:{radiusHeight};white-space:nowrap;box-sizing:border-box;padding:0 0 0 0;text-indent: 24px;text-align:right;display:inline-block;border-top:none;border-left:none;line-height:24px;">{borderRadiusBottomRight}</div>
         </span>
         <div class=break></div>
         <div class="item uglify">
           <span class=column>
             <span class=label>Top Left</span> <span class=value>{borderRadiusTopLeft}</span>
           </span>
           <span class=column>
             <span class=label>Top Right</span> <span class=value>{borderRadiusTopRight}</span>
           </span>
         </div>
         <div class="item uglify">
           <span class=column>
             <span class=label>Bottom Left</span> <span class=value>{borderRadiusBottomLeft}</span>
           </span>
           <span class=column>
             <span class=label>Bottom Right</span> <span class=value>{borderRadiusBottomRight}</span>
           </span>
         </div>
       </div>
       <div class="sub dropshadowinfo" style="display:{dropShadow}">
         <h4>Drop Shadow</h4>
         <div style="width:100%;height:40px;box-shadow:{dropShadow};margin-bottom:6px;" title="{dropShadow}"></div>
         {boxshadow}
       </div>
       <div class="sub paddinginfo" style="display:{padding};">
         <h4>Padding</h4>
         <div>
             <div class=paddingpreview style="position:relative;height:40px;border:0 solid rgb(171, 213, 153);box-sizing:content-box;border-left-width:{paddingLeft}px;border-right-width:{paddingRight}px;border-bottom-width:{paddingBottom}px;border-top-width:{paddingTop}px;margin-bottom:16px;">
               <span class=borderleft>{paddingLeft}</span>
               <span class=borderright>{paddingRight}</span>
               <span class=borderbottom>{paddingBottom}</span>
               <span class=bordertop>{paddingTop}</span>
             </div>
             <div class="item uglify">
               <span class=column>
                 <span class=label>Top</span> <span class=value>{paddingTop}px</span>
               </span>
               <span class=column>
                 <span class=label>Bottom</span> <span class=value>{paddingBottom}px</span>
               </span>
             </div>
             <div class="item uglify">
               <span class=column>
                 <span class=label>Left</span> <span class=value>{paddingLeft}px</span>
               </span>
               <span class=column>
                 <span class=label>Right</span> <span class=value>{paddingRight}px</span>
               </span>
             </div>
         </div>
       </div>
       <div class="sub spacinginfo" style="display:{margin};">
         <h4>Spacing</h4>
         <div>
             <div class=spacingpreview style="position:relative;height:40px;border:0 solid rgb(252, 199, 143);box-sizing:content-box;border-left-width:{marginLeft}px;border-right-width:{marginRight}px;border-bottom-width:{marginBottom}px;border-top-width:{marginTop}px;box-shadow:{negitive};margin-bottom:16px;">
               <span class=borderleft>{marginLeft}</span>
               <span class=borderright>{marginRight}</span>
               <span class=borderbottom>{marginBottom}</span>
               <span class=bordertop>{marginTop}</span>
             </div>
             <div class="item uglify">
               <span class=column>
                 <span class=label>Top</span> <span class=value>{marginTop}px</span>
               </span>
               <span class=column>
                 <span class=label>Bottom</span> <span class=value>{marginBottom}px</span>
               </span>
             </div>
             <div class="item uglify">
               <span class=column>
                 <span class=label>Left</span> <span class=value>{marginLeft}px</span>
               </span>
               <span class=column>
                 <span class=label>Right</span> <span class=value>{marginRight}px</span>
               </span>
             </div>
         </div>
       </div>
       <div class="sub RLcss">
         <div>
           <span class=cssclass>{elementname}</span> &nbsp;<span class=bracket>&#123;</span>
         </div>
         <div class=cssitem style="display:{widthCSS}">
           <span class=csskey>width</span>: <span class=cssvalue>{widthCSS}</span>;
         </div>
         <div class=cssitem style="display:{heightCSS}">
           <span class=csskey>height</span>: <span class=cssvalue>{heightCSS}</span>;
         </div>
         <div class=cssitem style="display:{fill}">
           <span class=csskey>background-color</span>: <span class=cssvalue>{hexfill}</span>/ <span class=cssvalue>{fillcolorname}</span>;
         </div>
         <div class=cssitem style="display:{font}">
           <span class=csskey>font-size</span>: <span class=cssvalue>{fontSize}</span>;
         </div>
         <div class=cssitem style="display:{font}">
           <span class=csskey>font-weight</span>: <span class=cssvalue>{fontWeight}</span>;
         </div>
         <div class=cssitem style="display:{font}">
           <span class=csskey>color</span>: <span class=cssvalue>{fontHex}</span>/ <span class=cssvalue>{fontcolorname}</span>;
         </div>
         <div class=cssitem style="display:{font}">
           <span class=csskey>line-height</span>: <span class=cssvalue>{lineHeight}</span>;
         </div>
         <div class=cssitem style="display:{hasOpentype}">
         <span class=csskey>font-feature-settings</span>: <span class=cssvalue>{opentype}</span>;
       </div>
         <div class=cssitem style="display:{padding}">
           <span class=csskey>padding</span>: <span class=cssvalue>{paddingTop}px {paddingRight}px {paddingBottom}px {paddingLeft}px</span>;
         </div>
         <div class=cssitem style="display:{margin}">
           <span class=csskey>margin</span>: <span class=cssvalue>{marginTop}px {marginRight}px {marginBottom}px {marginLeft}px</span>;
         </div>
         <div class=cssitem style="display:{border}">
           <span class=csskey>border</span>: <span class=cssvalue>{borderCSS}</span>;
         </div>
         <div class=cssitem style="display:{borderRadius}">
           <span class=csskey>border-radius</span>: <span class=cssvalue>{borderRadiusCSS}</span>;
         </div>
         <div class=cssitem style="display:{dropShadow}">
           <span class=csskey>box-shadow</span>: <span class=cssvalue>{dropShadow}</span>;
         </div>
         <span class=bracket>&#125;</span>
       </div>
     </div>
   </div>
   `;

  let rgbtohex = x => {
    var rgb = x.match(/\d+/g);
    var a = x.match("rgba");
    if (!rgb || a) {
      return x;
    }
    var r = Number(rgb[0]);
    var g = Number(rgb[1]);
    var b = Number(rgb[2]);
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toLocaleUpperCase()
    );
  };

  let whatcolor = x => {
    var stops = [
      colorstops.light,
      colorstops.dark,
      colorstops.extradark,
      colorstops.white
    ];
    var colors = ["Light", "Dark", "Extra-Dark", "White"];
    var str = "";
    for (var i = 0; i < stops.length; i++) {
      var greys = stops[i];
      var color = colors[i];
      for (var k in greys) {
        if (!greys.hasOwnProperty(k)) continue;
        if (greys[k] === x) {
          //return k;
          str += k + " (" + color + "); ";
        }
      }
    }

    var common = commoncolors;

    for (var k in common) {
      if (!common.hasOwnProperty(k)) continue;
      if (common[k] === x) {
        str += k + "; ";
      }
    }

    if (str == "") {
      console.warn("unknown color");
      return "unknown";
    }

    return str;
  };

  let colorstops = {
    white: {
      grey1: "rgb(255, 255, 255)",
      grey2: "rgb(255, 255, 255)",
      grey3: "rgb(255, 255, 255)",
      grey4: "rgb(244, 244, 244)",
      grey5: "rgb(234, 234, 234)",
      grey6: "rgb(202, 202, 202)",
      grey7: "rgb(160, 160, 160)",
      grey8: "rgb(118, 118, 118)",
      grey9: "rgb(80, 80, 80)",
      grey10: "rgb(50, 50, 50)"
    },
    light: {
      grey1: "rgb(255, 255, 255)",
      grey2: "rgb(250, 250, 250)",
      grey3: "rgb(245, 245, 245)",
      grey4: "rgb(234, 234, 234)",
      grey5: "rgb(225, 225, 225)",
      grey6: "rgb(194, 194, 194)",
      grey7: "rgb(153, 153, 153)",
      grey8: "rgb(112, 112, 112)",
      grey9: "rgb(75, 75, 75)",
      grey10: "rgb(44, 44, 44)"
    },
    dark: {
      grey1: "rgb(40, 40, 40)",
      grey2: "rgb(45, 45, 45)",
      grey3: "rgb(50, 50, 50)",
      grey4: "rgb(57, 57, 57)",
      grey5: "rgb(62, 62, 62)",
      grey6: "rgb(82, 82, 82)",
      grey7: "rgb(112, 112, 112)",
      grey8: "rgb(153, 153, 153)",
      grey9: "rgb(205, 205, 205)",
      grey10: "rgb(255, 255, 255)"
    },
    extradark: {
      grey1: "rgb(22, 22, 22)",
      grey2: "rgb(29, 29, 29)",
      grey3: "rgb(35, 35, 35)",
      grey4: "rgb(42, 42, 42)",
      grey5: "rgb(49, 49, 49)",
      grey6: "rgb(69, 69, 69)",
      grey7: "rgb(99, 99, 99)",
      grey8: "rgb(138, 138, 138)",
      grey9: "rgb(185, 185, 185)",
      grey10: "rgb(232, 232, 232)"
    }
  };

  let commoncolors = {
    red1: "rgb(255, 105, 105)",
    red2: "rgb(245, 60, 60)",
    red3: "rgb(230, 20, 20)",
    red4: "rgb(210, 10, 10)",
    red5: "rgb(180, 0, 0)",

    yellow1: "rgb(240, 210, 110)",
    yellow2: "rgb(235, 190, 50)",
    yellow3: "rgb(231, 176, 0)",
    yellow4: "rgb(230, 160, 0)",
    yellow5: "rgb(220, 145, 0)",

    green1: "rgb(70, 170, 70)",
    green2: "rgb(20, 155, 20)",
    green3: "rgb(15, 135, 15)",
    green4: "rgb(10, 120, 10)",
    green5: "rgb(0, 100, 0)",

    blue1: "rgb(70, 160, 245)",
    blue2: "rgb(45, 140, 235)",
    blue3: "rgb(20, 115, 230)",
    blue4: "rgb(0, 100, 220)",
    blue5: "rgb(0, 90, 190)",

    periwinkle: "rgb(115, 75, 195)",
    plum: "rgb(150, 60, 115)",
    fuchsia: "rgb(230, 20, 130)",
    magenta: "rgb(205, 0, 95)",
    orange: "rgb(240, 80, 0)",
    tangerine: "rgb(250, 140, 0)",
    chartreuse: "rgb(120, 200, 35)",
    kellygreen: "rgb(0, 135, 15)",
    seafoam: "rgb(30, 180, 140)",
    cyan: "rgb(5, 175, 230)",

    transparent: "rgba(0, 0, 0, 0)",
    grey: "rgb(112, 112, 112)",
    blue: "rgb(20, 115, 230)"
  };

  let copy = {
    "12px": "Small Copy",
    "14px": "Regular Copy",
    "18px": "Large Copy"
  };

  let mobilecopy = {
    "14px": "Small Copy",
    "17px": "Regular Copy",
    "20px": "Large Copy"
  };

  let altcopy = [
    {
      fontsize: "12px",
      color: "XXX",
      name: "Label Text"
    }
  ];

  let paneldrag = e => {
    console.log("panel drag starts");
    var t = e.target;
    if (t.className !== "paneldrag" || e.which !== 1) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    var panel = e.parentElement.parentElement;

    if (!panel) {
      return;
    }

    var ox = Number(panel.dataset.x) || 0;
    var oy = Number(panel.dataset.y) || 0;

    var sx = e.pageX - ox;
    var sy = e.pageY - oy;

    function panelmove(e) {
      e.preventDefault();
      e.stopPropagation();
      var x = e.pageX;
      var y = e.pageY;

      var nx = x - sx;
      var ny = y - sy;

      panel.style.transform = "translate(" + nx + "px," + ny + "px)";
      panel.dataset.x = nx;
      panel.dataset.y = ny;
    }

    function paneldone(e) {
      document.removeEventListener("mousemove", panelmove);
      document.removeEventListener("mouseup", paneldone);
    }

    document.addEventListener("mousemove", panelmove);
    document.addEventListener("mouseup", paneldone);
  };

  let resize = () => {
    var red = document.getElementsByClassName("redline")[0];

    if (!red) {
      return;
    }

    var actualWidth = Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    );
    var actualHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    red.style.width = actualWidth + "px";
    red.style.height = actualHeight + "px";
  };

  let eject = () => {
    console.log("eject");

    //document.body.removeEventListener('mousedown', paneldrag);

    //window.removeEventListener('resize', resize);

    //unloadCSS('MAGICALCSS');

    document.getElementsByClassName("redlinepanel")[0].style.visibility =
      "hidden";
  };

  let colorMapping = [
    ["#047A9C", "$primary"],
    ["#005A70", "$primary-two"],
    ["#FFFFFF", "$primary-three"],
    ["#F5F5F5", "$primary-four"],
    ["#FFB81C", "$secondary"],
    ["#FF9A19", "$secondary-two"],
    ["#DAF0ED", "$secondary-three"],
    ["#19A6A4", "$secondary-four"],
    ["#179599", "$secondary-five"],
    ["#C7C7C7", "$neutral"],
    ["#252525", "$neutral-two"],
    ["#6A7070", "$neutral-three"],
    ["#D9D9D9", "$neutral-four"],
    ["#E9E9E9", "$neutral-five"],
    ["#f5f5f5", "$neutral-six"],
    ["#DB0020", "$condition-one"],
    ["#038238", "$condition-two"],
    ["#DA0474", "$condition-three"]
  ];

  let colorNames = new Map(colorMapping);

  String.prototype.elemental = function(o) {
    return this.replace(/{([^{}]*)}/g, function(a, b) {
      var r = o[b];
      return typeof r != "undefined" ? r : ""; //a //typeof r === 'string'
    });
  };

  const elements = document.querySelectorAll(".redline-target");
  elements.forEach(element => {
    whRedline(element);
  });

  let elength = elements.length;
  for (let i = 1; i < elength; i = i + 2) {
    disRedline(elements[i], i);
  }

  document.body.addEventListener("mousedown", paneldrag);
})();
