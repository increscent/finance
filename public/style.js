(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; var style = document.createElement('style'); style.type = 'text/css';var css = ".view-holder{flex-grow:1;max-width:420px;padding-bottom:40px}.view-holder .view-header{display:flex;flex-direction:row;width:100%}.view-holder .view-header .view-title{padding:10px 0;flex-grow:1;padding-left:60px;font-size:14pt;text-align:center}.view-holder .view-header .view-close-button{padding:10px 0;width:60px;text-align:center;font-size:14pt}.view-holder .view-header .view-close-button:hover,.view-holder .view-header .view-close-button:active{background-color:#f0f0f0;cursor:pointer}.category-list{list-style-type:none;margin:0;padding:0;border-top:1px solid #ccc}.category-list>li{display:flex;flex-direction:row;width:100%;padding:0;border-bottom:1px solid #ccc;align-items:baseline}.category-list>li .category-name{flex-grow:1;padding-top:10px;padding-bottom:10px;padding-left:15px;font-size:12pt;text-decoration:underline}.category-list>li .category-name:hover,.category-list>li .category-name:active{background-color:#f0f0f0;cursor:pointer}.category-list>li .category-button{width:120px;padding:10px 0;font-size:12pt;text-align:center;text-decoration:underline}.category-list>li .category-button:hover,.category-list>li .category-button:active{background-color:#f0f0f0;cursor:pointer}.category-list-adjust{list-style-type:none;margin:0;padding:0;border-top:1px solid #ccc}.category-list-adjust>li{display:flex;flex-direction:row;align-items:baseline;width:100%;padding:0;border-bottom:1px solid #ccc}.category-list-adjust>li .category-name-adjust{flex-grow:1;padding-top:10px;padding-bottom:10px;padding-left:10px;font-size:11pt}.category-list-adjust>li .category-balance-adjust{flex-grow:3;padding-top:10px;padding-bottom:10px;padding-right:10px;font-size:11pt;text-align:right}.category-list-adjust>li .category-balance-adjust .allowance-edit{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;width:45px}.category-list-adjust .form-submit-row{padding-top:15px}.category-summary{padding-bottom:10px}.category-summary .category-balance{width:100%;text-align:center;font-size:12pt;margin-top:5px;margin-bottom:15px}.category-summary-edit{padding-top:10px;padding-bottom:10px;font-size:11pt}.budget-summary{padding-top:10px;padding-bottom:15px}.budget-summary .summary-row{padding-left:15px;padding-right:15px;padding-bottom:10px;font-size:12pt}.budget-summary .logout-row{padding-left:15px;padding-right:15px;padding-bottom:10px;font-size:12pt;text-align:right}.category-add{padding-top:10px;padding-bottom:10px;font-size:11pt}.category-edit .name-edit{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;width:150px}.category-edit .allowance-edit{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;width:45px}.category-edit .allowance-type-picker{margin:0;padding:0;width:18px;height:18px}.category-edit .allowance-type-picker+label{border-radius:3px;padding:3px 7px;margin-left:-19px;font-size:11pt;background-color:#fff;border:1px solid #ccc}.category-edit .allowance-type-picker+label:hover{cursor:pointer}.category-edit .allowance-type-picker:checked+label{background-color:#ccc}.category-delete{padding-top:10px;padding-bottom:10px;font-size:11pt}.category-delete .form-row select{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;background-color:#fff;width:150px}.transaction-add{padding-top:10px;padding-bottom:10px}.transaction-add .amount-edit{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;width:85px}.transaction-add .note-edit{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;min-width:100px;max-width:200px}.transaction-add input[type=date]{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc}.transaction-add select{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;background-color:#fff;width:150px}.transaction-add .transaction-type-picker{margin:0;padding:0;width:18px;height:18px}.transaction-add .transaction-type-picker+label{border-radius:3px;padding:3px 7px;margin-left:-19px;font-size:11pt;background-color:#fff;border:1px solid #ccc}.transaction-add .transaction-type-picker+label:hover{cursor:pointer}.transaction-add .transaction-type-picker:checked+label{background-color:#f0f0f0}.transaction-add .transaction-type-picker+.left-label{border-top-right-radius:0;border-bottom-right-radius:0}.transaction-add .transaction-type-picker+.right-label{border-top-left-radius:0;border-bottom-left-radius:0}.debit-credit-list{list-style-type:none;margin:0;padding:0;width:100%;font-size:11pt}.debit-credit-list li.list-title{border-top:1px solid #ccc}.debit-credit-list li.list-title .left-align{font-weight:bold}.debit-credit-list li{border-bottom:1px solid #ccc;padding:7px 10px}.debit-credit-list li .info-row{display:flex;padding-top:3px;padding-bottom:3px;align-items:baseline}.debit-credit-list li .info-row .left-align{flex-grow:4;text-align:left}.debit-credit-list li .info-row .right-align{flex-grow:1;text-align:right}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}.link-button{font-size:11pt;color:#555;text-decoration:underline;margin-left:10px}.link-button:hover,.link-button:active{cursor:pointer}.link-button.delete-button{color:red}.input-field{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc}.form-row{display:flex;padding:0 10px 15px;align-items:baseline}.form-column-left{padding-right:5px;flex-basis:75px}.form-column-right{flex-grow:1}.form-submit-row{flex-grow:1;padding:0 10px 15px;text-align:center}.form-button{border-radius:3px;padding:7px;margin-left:5px;margin-right:5px;font-size:11pt;color:#333;border:1px solid #ccc;background-color:#fff}.form-button:hover,.form-button:active{background-color:#f0f0f0;cursor:pointer}.login-view{padding:40px 20px;text-align:center;max-width:420px;margin:auto}.login-view h2{text-decoration:underline}.login-view p{margin:30px 0;font-size:12pt}.login-view a{border-radius:3px;padding:5px;font-size:11pt;color:#333;border:1px solid #ccc;padding:7px 7px;text-decoration:none}.login-view a:active,.login-view a:hover{background-color:#f0f0f0;cursor:pointer}body{font-size:11pt;font-family:Verdana,Helvetica,sans-serif;color:#333;margin:0}#root{width:100%;height:100%;position:relative}#views{width:100%;display:flex;flex-direction:row}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}]},{},[1]);
