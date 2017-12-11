/**
 * The Map Editor of this page.
 * The Map Editor is power by Javascript and Jquery and have Java Servlet in
 * background for save and load maps into the editor.
 *
 * @param divID The Div to place the editor in, ref by the ID.
 *					 The div most have size of 700x525 px
 * @param loadXML The xml file to be load into the editor, can be null or not set.
 * @param notAllowEdit set true/false if the editor allow user to edit the map, as defalt this is true and allow edit.
 * can be null or not set.
 * @param onlyMap set to true if only the map part of the editor will be show.
 */
function mapEditor(divID, loadXML, notAllowEdit, onlyMap) {

	var allow_edit = true;

	/**
	 * All public configs that can be do to the Map Editor.
	 */
	var scriptConfig = {
			background: "../../build/assets/spelplan.png",
			player: "../../build/assets/player.png",
			obstacle: "../../build/assets/obstacle.png",
			onMoveObstacleMessage: "Move the obstacle to the game field for place it, or out of game field to remove.",
			maxAllowObstacle: 250,
			maxAllowObstacleMsg: "You can not have more than 250 obstacle on the map.",
			selectObstacleLabel: "Obstacle size ",
			canNotAddMorePlayer: "You can not add more that 1 player to the map.",
			sendSubmit: "./editmap",
			submitSave: "Generate",
			noPlayerSetMsg: "You must place a player starting position first"
		}
		/**
		 * All public configs that can be do to the Map Editor.
		 */
	var playerListDir = [{
		val: "0s",
		text: "Small Snake 0",
		url: "../../build/assets/player0.png",
		x: 34,
		y: 14,
		angle: 0,
		offsetX: 27,
		offsetY: 7,
		r: 7
	}, {
		val: "90s",
		text: "Small Snake 90",
		url: "../../build/assets/player90.png",
		x: 14,
		y: 34,
		angle: 90,
		offsetX: 7,
		offsetY: 7,
		r: 7
	}, {
		val: "180s",
		text: "Small Snake 180",
		url: "../../build/assets/player180.png",
		x: 34,
		y: 14,
		angle: 180,
		offsetX: 7,
		offsetY: 7,
		r: 7
	}, {
		val: "270s",
		text: "Small Snake 270",
		url: "../../build/assets/player270.png",
		x: 14,
		y: 34,
		angle: 270,
		offsetX: 7,
		offsetY: 27,
		r: 7
	}, {
		val: "0b",
		text: "Big Snake 0",
		url: "../../build/assets/player0.png",
		x: 72,
		y: 29,
		angle: 0,
		offsetX: 58,
		offsetY: 14,
		r: 14
	}, {
		val: "90b",
		text: "Big Snake 90",
		url: "../../build/assets/player90.png",
		x: 29,
		y: 72,
		angle: 90,
		offsetX: 14,
		offsetY: 14,
		r: 14
	}, {
		val: "180b",
		text: "Big Snake 180",
		url: "../../build/assets/player180.png",
		x: 60,
		y: 30,
		angle: 180,
		offsetX: 14,
		offsetY: 14,
		r: 14
	}, {
		val: "270b",
		text: "Big Snake 270",
		url: "../../build/assets/player270.png",
		x: 30,
		y: 60,
		angle: 270,
		offsetX: 14,
		offsetY: 58,
		r: 14
	}];
	/**
	 * Private Methods will begin here, none of this methods will be use outside of the MapEditr.
	 */

	var mainDiv = $("#" + divID);
	var gameWindow = $("<div></div>");
	var infoBar = $("<div></div>");
	var mapMetaData = {
		name: "",
		description: "",
		difficuly: 2,
		game_speed: 5,
		growth: 1
	};
	var mapPlayerPoint = null;
	var mapID = -1;


	var currentHold = null;


	/**
	 * Collect a lot of all make or call create HTML tags
	 */
	var MapEditorMake = {
		div: function(left, top, width, heigh, color, border) {
			var newDiv = $("<div></div>");
			newDiv.css("position", "absolute");
			if (heigh != null) {
				newDiv.css("height", "" + heigh + "px");
			}
			if (width != null) {
				newDiv.css("width", "" + width + "px");
			}
			newDiv.css("top", "" + top + "px");
			newDiv.css("left", "" + left + "px");
			if (color) {
				newDiv.css("backgroundColor", color);
			}
			if (border) {
				newDiv.css("border", border);
			}
			return newDiv;
		},
		inputText: function(defaultValue, callOnEdit, showOnEmpty) {
			var inputBox = $("<input></input>");
			inputBox.attr("type", "text");
			if (defaultValue != null) {
				inputBox.val(defaultValue);
				if (inputBox.val() == "" && showOnEmpty) {
					inputBox.val(showOnEmpty);
				}
			} else {
				if (showOnEmpty) {
					inputBox.val(showOnEmpty);
				}
			}
			if (typeof callOnEdit == "function") {
				inputBox.change(callOnEdit);
			}
			if (showOnEmpty) {
				inputBox.blur(function() {
					if ($(this).val() == "") {
						$(this).val(showOnEmpty);
					}
				});
				inputBox.focus(function() {
					if ($(this).val() == showOnEmpty) {
						$(this).val("");
					}
				});
			}
			inputBox.css("width", "100%");
			return inputBox;
		},
		textArea: function(defaultValue, callOnEdit, showOnEmpty) {
			var inputBox = $("<textarea></textarea>");
			if (defaultValue != null) {
				inputBox.text(defaultValue);
				if (inputBox.text() == "" && showOnEmpty) {
					inputBox.text(showOnEmpty);
				}
			} else {
				if (showOnEmpty) {
					inputBox.text(showOnEmpty);
				}
			}
			if (typeof callOnEdit == "function") {
				inputBox.change(callOnEdit);
			}
			if (showOnEmpty) {
				inputBox.blur(function() {
					if ($(this).text() == "") {
						$(this).text(showOnEmpty);
					}
				});
				inputBox.focus(function() {
					if ($(this).text() == showOnEmpty) {
						$(this).text("");
					}
				});
			}
			inputBox.css("width", "100%");
			inputBox.attr("id", "xmlArea");
			return inputBox;
		},
		inputSelect: function(listValues, preSelect, callOnEdit) {
			var inputBox = $("<select></select>");
			for (var i = 0; i < listValues.length; i++) {
				var value = listValues[i];
				var subNode = $("<option></option>");
				if (typeof value == "object") {
					if (typeof value.val == "string") {
						subNode.val(value.val);
						if (value.val == preSelect) {
							subNode.attr("selected", "selected");
						}
					}
					if (typeof value.text == "string") {
						subNode.text(value.text);
					}
				} else {
					subNode.text(value);
					if (value == preSelect) {
						subNode.attr("selected", "selected");
					}
				}
				inputBox.append(subNode);
			}
			if (typeof callOnEdit == "function") {
				inputBox.change(callOnEdit);
			}
			inputBox.css("width", "100%");
			return inputBox;
		},
		image: function(url, left, top, width, heigh) {
			var img = $("<img />");
			img.attr("src", url);
			img.css("position", "absolute");
			if (heigh != null) {
				img.css("height", "" + heigh + "px");
			}
			if (width != null) {
				img.css("width", "" + width + "px");
			}
			img.css("top", "" + top + "px");
			img.css("left", "" + left + "px");
			return img;
		}
	};

	/**
	 * Methods for move a html tag in select space of parent.
	 */
	var MapEditorMove = {
		pos: function(event, currentHoldObj, refObj) {

			var xpoint = event.pageX - refObj.offset().left - currentHoldObj.width / 2;
			var ypoint = event.pageY - refObj.offset().top - currentHoldObj.height / 2;
			return {
				x: xpoint,
				y: ypoint
			};
		},
		/**
		 * Test if the select obj is over the select ref obj.
		 */
		isOver: function(event, currentHoldObj, refObj) {
			var p = MapEditorMove.pos(event, currentHoldObj, refObj);
			if (p.x <= 0 || p.y <= 0 ||
				p.y >= (refObj.height() - currentHoldObj.height) ||
				p.x >= (refObj.width() - currentHoldObj.width)) {
				return false;
			}
			return true;
		}
	};

	/**
	 * Hold a list of all Obstacle that has be add to the current map.
	 */
	var MapEditorObstacleList = {
		mapObstacleData: new Array(),
		add: function(x, y, r) {

			this.mapObstacleData.push({
				x: x,
				y: y,
				r: r
			});
		},
		remove: function(x, y, r) {
			for (var u = 0; u < this.mapObstacleData.length; u++) {
				var i = this.mapObstacleData[u];
				if (i.x == x && i.y == y && i.r == r) {
					this.mapObstacleData.splice(u, 1);
					return;
				}
			}
		},
		get: function() {
			return this.mapObstacleData;
		},
		size: function() {
			return this.mapObstacleData.length;
		}


	}

	/**
	 * The private name space.
	 */
	var self = {

		make: MapEditorMake,
		move: MapEditorMove,

		hover: function(tag, text) {
			tag.hover(function() {
				infoBar.text(text);
			}, function() {
				infoBar.text(scriptConfig.publicLabel);
			});
		},

		/**
		 * Main function for load a XML doc.
		 */
		loadXML: function(xmlDoc) {
			var rootDoc = $(xmlDoc).find("snakeappmap");

			mapID = parseInt(rootDoc.attr("id"));
			if (mapID == NaN) {
				mapID = -1;
			}
			mapMetaData.name = rootDoc.find("name").text();
			mapMetaData.description = rootDoc.find("description").text();
			mapMetaData.difficuly = parseInt(rootDoc.find("difficuly").text());
			if (mapMetaData.difficuly == NaN || mapMetaData.difficuly <= 0 || mapMetaData.difficuly >= 5) {
				mapMetaData.difficuly = 2;
			}
			mapMetaData.game_speed = parseFloat(rootDoc.find("gamespeed").text());
			if (!(mapMetaData.game_speed > 0)) {
				mapMetaData.game_speed = 5;
			}
			mapMetaData.growth = parseInt(rootDoc.find("growthspeed").text());
			if (mapMetaData.growth == NaN || mapMetaData.growth < 0) {
				mapMetaData.growth = 1;
			}

			rootDoc.find("obstacles").find("obstacles").each(function() {

				MapEditorObstacleList.add(parseInt($(this).attr("x")), parseInt($(this).attr("y")), parseInt($(this).attr("r")));
			})


			var playerDoc = rootDoc.find("player");
			var playerR = playerDoc.attr("r");
			var playerA = playerDoc.attr("a");
			for (var x in playerListDir) {
				var playerListDirItem = playerListDir[x];
				if (playerListDirItem.r == playerR && playerListDirItem.angle == playerA) {
					mapPlayerPoint = playerListDirItem;
					mapPlayerPoint.posX = parseInt(playerDoc.attr("x")) - mapPlayerPoint.offsetX;
					mapPlayerPoint.posY = parseInt(playerDoc.attr("y")) - mapPlayerPoint.offsetY;

				}
			}

		},

		/**
		 * Function for make the main UI with HTML
		 */
		makeUI: function(mainDiv, onlyEditor) {
			if (!onlyEditor) {
				mainDiv.css("backgroundColor", "#white");
				mainDiv.css("position", "relative");
				mainDiv.css("height", "525px");
				mainDiv.css("width", "700px");
				mainDiv.css("top", "0px");
				mainDiv.css("left", "0px");

				var gameWindowOut = self.make.div(45, 45, 300, 400, "#FFFFFF", "5px ridge black");
				gameWindowOut.css("background", "url('" + scriptConfig.background + "')");
				gameWindow = self.make.div(0, 0, 300, 400);
				gameWindowOut.append(gameWindow);
				var mapConfig = self.make.div(385, 65, 250, 190, "#666666", "4px ridge #333333");
				//mapConfig.css("overflow","auto");
				self.makeConfigUI(mapConfig);

				var toolBar = self.make.div(385, 285, 250, 140, "#666666", "4px ridge #333333");
				//toolBar.css("overflow","auto");
				self.makeToolBarUI(toolBar);
				infoBar = self.make.div(45, 465, 600, 23, "#CCCCCC", "2px ridge #333333");
				infoBar.text(self.publicLabel);

				mainDiv.append(gameWindowOut, mapConfig, toolBar);
				self.makeMap(gameWindow)
				mainDiv.mousemove(self.onMouseMove);
				if (!allow_edit) {
					mainDiv.find("input").attr('disabled', 'disabled');
					mainDiv.find("textarea").attr('disabled', 'disabled');
					mainDiv.find("select").attr('disabled', 'disabled');
				}
			} else {
				mainDiv.css("backgroundColor", "#204932");
				mainDiv.css("position", "relative");
				mainDiv.css("height", "400px");
				mainDiv.css("width", "300px");
				mainDiv.css("top", "0px");
				mainDiv.css("left", "0px");

				gameWindowOut = self.make.div(0, 0, 300, 400, "#FFFFFF");
				gameWindowOut.css("background", "url('" + scriptConfig.background + "')");
				gameWindow = self.make.div(0, 0, 300, 400);
				self.makeMap(gameWindow);
				gameWindowOut.append(gameWindow);
				mainDiv.append(gameWindowOut);
			}
		},

		/**
		 * Function for make the UI for edit map name, level, and more.
		 */
		makeConfigUI: function(putIntoDiv) {

			var table = $("<table></table>");
			table.css("font-size", "18px");
			table.css("font-family", "monospace");
			table.css("width", "100%");
			var name = $("<tr><td>Name:</td><td></td></tr>");
			name.find(":empty").append(self.make.inputText(mapMetaData.name, function() {
				mapMetaData.name = $(this).val();
			}, "[Level Name]"));
			self.hover(name, "Enter name for this level.");
			var level = $("<tr><td>Level:</td><td></td></tr>");
			this.hover(level, "Select how difficuly this level is.");
			level.find(":empty").append(self.make.inputSelect([{
				val: "1",
				text: "Easy"
			}, {
				val: "2",
				text: "Normal"
			}, {
				val: "3",
				text: "Hard"
			}, {
				val: "4",
				text: "Very Hard"
			}], mapMetaData.difficuly, function() {
				mapMetaData.difficuly = $(this).val();
			}));

			var speed = $("<tr><td>Speed:</td><td></td></tr>");
			this.hover(speed, "Set the Snake speed in the game.");
			speed.find(":empty").append(self.make.inputText(mapMetaData.game_speed, function() {
				var newValue = $(this).val();
				if (newValue >= 1 && newValue <= 25) {
					mapMetaData.game_speed = parseFloat($(this).val());
				} else {
					alert("Value out of rang, enter integer 1 to 25");
					$(this).val("[Game Speed (0-25)]");
				}
			}, "[Game Speed (0-25)]"));

			var growth = $("<tr><td>Growth:</td><td></td></tr>");
			self.hover(growth, "Set how much the snake will growth for each collect apple.");
			growth.find(":empty").append(self.make.inputText(mapMetaData.growth, function() {
				var newValue = $(this).val();
				if (newValue >= 0 && newValue <= 25) {
					mapMetaData.growth = parseInt($(this).val());
				} else {
					alert("Value out of rang, enter 0 integer to 25");
					$(this).val("[Growth Speed (0-25)]");
				}
			}, "[Growth Speed (0-25)]"));

			var descriptionLabel = $("<tr><td colspan='2'>Description:</td></tr>");
			var descriptionText = $("<tr><td colspan='2'></td></tr>");
			descriptionText.find(":empty").append(self.make.textArea(mapMetaData.description, function() {
				mapMetaData.description = $(this).val();
			}, "[Levels Description, Hold this text short]"));
			self.hover(descriptionText, "A short description of this level.");

			table.append(name, level, speed, growth, descriptionLabel, descriptionText);



			putIntoDiv.append(table);
		},

		/**
		 * Function make UI for the panel for add items to the game map and save/public a map.
		 */
		makeToolBarUI: function(putIntoDiv) {
			var table = $("<table></table>");
			table.css("font-size", "18px");
			table.css("font-family", "monospace");
			table.css("width", "100%");
			var obstacleTr = $("<tr></tr>");
			var selectSize = self.make.inputSelect([{
				val: "7",
				text: scriptConfig.selectObstacleLabel + "7"
			}, {
				val: "10",
				text: scriptConfig.selectObstacleLabel + "10"
			}, {
				val: "15",
				text: scriptConfig.selectObstacleLabel + "15"
			}, {
				val: "20",
				text: scriptConfig.selectObstacleLabel + "20"
			}, {
				val: "30",
				text: scriptConfig.selectObstacleLabel + "30"
			}, {
				val: "40",
				text: scriptConfig.selectObstacleLabel + "40"
			}, {
				val: "50",
				text: scriptConfig.selectObstacleLabel + "50"
			}, ], "15");
			var obstacleTrTd1 = $("<td></td>").append(self.make.image(scriptConfig.obstacle, 0, 0, 30, 30).mousedown(selectSize, self.onMoveObstacle).css("position", "relative"));

			var obstacleTrTd2 = $("<td></td>").append(selectSize);
			obstacleTrTd2.css("width", "100%");
			obstacleTr.append(obstacleTrTd1, obstacleTrTd2);

			var playerTr = $("<tr></tr>");
			var playerAngle = self.make.inputSelect(playerListDir, "90s");
			var playerTrTd1 = $("<td></td>").append(self.make.image(scriptConfig.player, 0, 0, 20, 40).mousedown(playerAngle, self.onMovePlayer).css("position", "relative"));
			var playerTrTd2 = $("<td></td>").append(playerAngle);
			playerTrTd2.css("width", "100%");
			playerTr.append(playerTrTd1, playerTrTd2);
			table.append(obstacleTr, playerTr);

			var submitSave = $("<input></input>").val(scriptConfig.submitSave).click("save", self.submit).attr("type", "button");
			var submitSavePublic = $("<input></input>").val(scriptConfig.submitPublic).click("public",
				function(event) {
					if (confirm(scriptConfig.submitPublicMsg)) {
						self.submit(event);
					}
				}).attr("type", "button");
			submitSavePublic.attr('class', 'buttonstyle');
			submitSavePublic.css({
				"width": "160px"
			})

			putIntoDiv.append(table, submitSave);
			submitSave.attr('class', 'buttonstyle');
			submitSave.css({
				"width": "80px"
			})
		},

		/**
		 * Make the UI for the Map, and load pre config map from the data templet
		 */
		makeMap: function(gameWindow) {
			var list = MapEditorObstacleList.get();
			for (var i = 0; i < list.length; i++) {
				var r = list[i].r;
				var r2 = r * 2;
				var image = self.make.image(scriptConfig.obstacle, list[i].x - r, list[i].y - r, r2, r2);
				gameWindow.append(image);
				self.onMoveObstacleAttac(image, r2, r2, r);
			}

			if (mapPlayerPoint) {

				var playerPoint = self.make.image(mapPlayerPoint.url, mapPlayerPoint.posX, mapPlayerPoint.posY, mapPlayerPoint.x, mapPlayerPoint.y);
				self.onMovePlayerAttac(playerPoint, mapPlayerPoint.x, mapPlayerPoint.y, mapPlayerPoint);
				gameWindow.append(playerPoint);

			}

		},

		onMouseMove: function(event) {
			if (currentHold) {
				var pos = self.move.pos(event, currentHold, mainDiv);
				currentHold.obj.css("left", "" + parseInt(pos.x) + "px");
				currentHold.obj.css("top", "" + parseInt(pos.y) + "px");
				if (!self.move.isOver(event, currentHold, mainDiv)) {
					currentHold.obj.remove();
					currentHold = null;
				}
				return false;
			}
			return true;
		},
		onMoveObstacle: function(event) {
			if (!allow_edit) {
				// Block if not allow to edit
				return false;
			}
			if (MapEditorObstacleList.size() >= scriptConfig.maxAllowObstacle) {
				alert(scriptConfig.maxAllowObstacleMsg);
				return false;
			}
			var heigth = parseInt(event.data.val()) * 2;
			var width = parseInt(event.data.val()) * 2;
			var radius = (heigth + width) / 4;

			var newObj = self.make.image(scriptConfig.obstacle, 0, 0, width, heigth);
			currentHold = {
				obj: newObj,
				width: width,
				height: heigth
			};
			var pos = self.move.pos(event, currentHold, mainDiv);


			currentHold.obj.css("left", "" + pos.x + "px");
			currentHold.obj.css("top", "" + pos.y + "px");
			self.onMoveObstacleAttac(newObj, width, heigth, radius);
			mainDiv.append(newObj);
			infoBar.text(scriptConfig.onMoveObstacleMessage);
			return false;
		},
		onMoveObstacleAttac: function(newObj, width, heigth, radius) {
			newObj.mousedown(function() {
				if (currentHold == null && allow_edit) {
					MapEditorObstacleList.remove($(this).position().left + radius, $(this).position().top + radius, radius);
					$(this).appendTo(mainDiv);
					var offsetX = gameWindow.offset().left - mainDiv.offset().left + $(this).position().left;
					var offsetY = gameWindow.offset().top - mainDiv.offset().top + $(this).position().top;
					currentHold = {
						obj: $(this),
						width: width,
						height: heigth
					};
					currentHold.obj.css("left", "" + parseInt(offsetX) + "px");
					currentHold.obj.css("top", "" + parseInt(offsetY) + "px");
					infoBar.text(scriptConfig.onMoveObstacleMessage);
					return false;
				}
				return true;
			});

			newObj.mouseup(function(event) {
				if (currentHold != null && allow_edit) {
					if (self.move.isOver(event, currentHold, gameWindow)) {
						var newPos = self.move.pos(event, currentHold, gameWindow);
						currentHold.obj.css("left", "" + newPos.x + "px");
						currentHold.obj.css("top", "" + newPos.y + "px");
						currentHold.obj.appendTo(gameWindow);
						MapEditorObstacleList.add(newPos.x + radius, newPos.y + radius, radius);
						currentHold = null;
					} else {
						currentHold.obj.remove();
						currentHold = null;
					}
					infoBar.text(scriptConfig.publicLabel);
				}
			});
		},
		onMovePlayer: function(event) {
			if (!allow_edit) {
				// Block if not allow to edit
				return false;
			}
			if (mapPlayerPoint != null) {
				alert(scriptConfig.canNotAddMorePlayer);
				return false;
			}
			var select = null;
			for (var x = 0; x < playerListDir.length; x++) {
				if (playerListDir[x].val == event.data.val()) {
					select = playerListDir[x];
					break;
				}
			}

			var heigth = select.y;
			var width = select.x;

			var newObj = self.make.image(select.url, 0, 0, width, heigth);
			currentHold = {
				obj: newObj,
				width: width,
				height: heigth
			};
			var pos = self.move.pos(event, currentHold, mainDiv);
			currentHold.obj.css("left", "" + pos.x + "px");
			currentHold.obj.css("top", "" + pos.y + "px");
			self.onMovePlayerAttac(newObj, width, heigth, select);

			mainDiv.append(newObj);
			infoBar.text(scriptConfig.onMoveObstacleMessage);
			return false;
		},
		onMovePlayerAttac: function(newObj, width, heigth, select) {
			newObj.mousedown(function() {
				if (currentHold == null && allow_edit) {
					mapPlayerPoint = null;
					$(this).appendTo(mainDiv);
					var offsetX = gameWindow.offset().left - mainDiv.offset().left + $(this).position().left;
					var offsetY = gameWindow.offset().top - mainDiv.offset().top + $(this).position().top;
					currentHold = {
						obj: $(this),
						width: width,
						height: heigth
					};

					currentHold.obj.css("left", "" + parseInt(offsetX) + "px");
					currentHold.obj.css("top", "" + parseInt(offsetY) + "px");
					infoBar.text(scriptConfig.onMoveObstacleMessage);
					return false;
				}
				return true;
			});

			newObj.mouseup(function(event) {
				if (currentHold != null && allow_edit) {
					if (self.move.isOver(event, currentHold, gameWindow)) {
						var newPos = self.move.pos(event, currentHold, gameWindow);
						currentHold.obj.css("left", "" + newPos.x + "px");
						currentHold.obj.css("top", "" + newPos.y + "px");
						currentHold.obj.appendTo(gameWindow);

						mapPlayerPoint = select;
						mapPlayerPoint.posX = newPos.x + select.offsetX;
						mapPlayerPoint.posY = newPos.y + select.offsetY;

						currentHold = null;
					} else {
						currentHold.obj.remove();
						currentHold = null;
					}
					infoBar.text(scriptConfig.publicLabel);
				}
			});
		},

		/**
		 * This function will be call while a user try to save/public a map
		 */
		submit: function(event) {
			self.submitXML(event);
		},

		/**
		 * This function will return and alert a XML file for this map, this is only use for test.
		 */
		submitXML: function(event) {

			var outHTML = '<?xml version="1.0" encoding="UTF-8"?>\n';
			outHTML += '<snakeappmap id="-1">\n';
			outHTML += '\t<name>' + mapMetaData.name + '</name>\n';
			outHTML += '\t<description>' + mapMetaData.description + '</description>\n';
			outHTML += '\t<difficuly>' + mapMetaData.difficuly + '</difficuly>\n';
			outHTML += '\t<map x="300" y="400" />\n';
			outHTML += '\t<gamespeed type="simple">' + mapMetaData.game_speed + '</gamespeed>\n';
			outHTML += '\t<growthspeed type="simple">' + mapMetaData.growth + '</growthspeed>\n';
			outHTML += '\t<item type="simple" r="10">1</item>\n';
			outHTML += '\t<levelgoal type="greater">15</levelgoal>\n';
			if (mapPlayerPoint) {
				outHTML += '\t<player x="' + Math.floor(mapPlayerPoint.posX) + '" y="' + Math.floor(mapPlayerPoint.posY) + '" r="' + Math.floor(mapPlayerPoint.r) + '" a="' + Math.floor(mapPlayerPoint.angle) + '" s="4" />\n';
			} else {
				alert(scriptConfig.noPlayerSetMsg);
				return;
			}
			outHTML += '\t<obstacles>\n';
			var obstacleBuilderList = MapEditorObstacleList.get();
			for (var x in obstacleBuilderList) {
				var obstacleBuilderListItem = obstacleBuilderList[x];
				outHTML += '\t\t<item x="' + Math.floor(obstacleBuilderListItem.x) + '" y="' + Math.floor(obstacleBuilderListItem.y) + '" r="' + Math.floor(obstacleBuilderListItem.r) + '" />\n';
			}
			outHTML += '\t</obstacles>\n';
			outHTML += '</snakeappmap>\n';

			document.getElementById("textarea").value = outHTML;
		},
		/**
		 * Do a Post call on given path with the data from the map.
		 */
		submitPost: function(event) {
			var outPost = {};
			outPost.action = event.data;
			outPost.id = mapID;
			outPost.name = mapMetaData.name;
			if (jQuery.trim(outPost.name) == "") {
				alert("You most set a name of the map!");
				return;
			}

			outPost.description = mapMetaData.description;


			outPost.difficuly = mapMetaData.difficuly;
			outPost.gamespeed = mapMetaData.game_speed;
			outPost.growth = mapMetaData.growth;


			outPost.collectiblesize = 10;
			outPost.collectiblecount = 1;
			outPost.gamesize = "{300,400}";
			var obstacleBuilder = "";
			var obstacleBuilderList = MapEditorObstacleList.get();
			for (var x in obstacleBuilderList) {
				var obstacleBuilderListItem = obstacleBuilderList[x];
				obstacleBuilder += "{" + Math.floor(obstacleBuilderListItem.x) + "," + Math.floor(obstacleBuilderListItem.y) + "," + Math.floor(obstacleBuilderListItem.r) + "}";
			}
			outPost.obstacle = obstacleBuilder;

			if (mapPlayerPoint) {
				outPost.player = "{" + Math.floor(mapPlayerPoint.posX) + "," + Math.floor(mapPlayerPoint.posY) + "," + Math.floor(mapPlayerPoint.r) + "," + Math.floor(mapPlayerPoint.angle) + ",4}";
			} else {
				alert(scriptConfig.noPlayerSetMsg);
				return;
			}

			$.post(scriptConfig.sendSubmit, outPost, function(returnvalue) {
				if (returnvalue) {
					alert(returnvalue);
				}
			});
		}

	};



	/****************************************************************************
	 *   HERE IS THE CODE BEGIN TO RUN; ALL OTHER CODE IS OBJECTS THAT NOT RUN   *
	 ****************************************************************************/
	if (notAllowEdit) {
		allow_edit = false;
	}
	if (typeof loadXML == "string") {
		$.ajax({
			type: "GET",
			url: loadXML,
			dataType: "xml",
			success: function(xmlDoc) {
				self.loadXML(xmlDoc);
				self.makeUI(mainDiv, onlyMap);
			},
			error: function() {
				self.makeUI(mainDiv, onlyMap);
			}
		});
	} else {
		self.makeUI(mainDiv, onlyMap);
	}
}