/* collapse/uncollapse this collapsible */
function collapsibleToggle (collapsible, direction = null) {
	collapsible = $(collapsible);
	content = collapsible.next();
	collapsed = $(collapsible).hasClass("active");
	content.toggleClass("invisible");
	collapsible.toggleClass("active");
	if ((!collapsed && direction == null) || direction == "open") {
		images = content.find("img");
		images.each(function(index) {
			img = $(this);
			/* load image if not yet loaded */
			if (img[0].hasAttribute("data-src")) {
				img.attr("src", img.attr("data-src"));
				img.removeAttr("data-src");
			}
		});
	}
}
$(".collapsible").on('click', (MouseEvent) => collapsibleToggle(MouseEvent.target));

/* collapse/uncollapse all collapsibles */
function collapsibleToggleAll (direction) {
	$(".collapsible").each(function(index){
		collapsibleToggle(this, direction = direction);
	});
}
$("#openall").on('click', function(){collapsibleToggleAll(direction = "open")});
$("#closeall").on('click', function(){collapsibleToggleAll(direction = "close")});

/* collapse/uncollapse sidebar */
function sidebarCollapse(MouseEvent, side) {
	target = $(MouseEvent.target);
	active = target.hasClass("active") + 0;
	target.toggleClass("active");
	target.html(["-", "+"][active]);
	$(":root").css("--sidebar_" + side + "_size", ["min(100%, 500px)", "0%"][active]);
	$(".sidebar." + side + ".main,.sidebar." + side + ".collapse.holder").toggleClass("active");
}
$(".sidebar.left.collapse.button").on("click", (MouseEvent) => sidebarCollapse(MouseEvent, "left"));

/* change main width size */
function changeMainWidth(MouseEvent, amount) {
	target = $(MouseEvent.target);
	active = target.hasClass("active") + 0;
	if (!(active)) {
		$(":root").css("--main_width_base", amount);
		$("#100width,#80width,#60width,#40width").each(function(index){
			if (this === target.get(0)) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
	}
}
$("#100width").on("click", (MouseEvent) => changeMainWidth(MouseEvent, "100%"));
$("#80width").on("click", (MouseEvent) => changeMainWidth(MouseEvent, "80%"));
$("#60width").on("click", (MouseEvent) => changeMainWidth(MouseEvent, "60%"));
$("#40width").on("click", (MouseEvent) => changeMainWidth(MouseEvent, "40%"));

/* change main width type */
function changeMainWidthType(MouseEvent, type) {
	target = $(MouseEvent.target);
	active = target.hasClass("active") + 0;
	if (!(active)) {
		$(".center.main").toggleClass("responsive");
		$("#fixwidth,#reswidth").each(function(index){
			if (this === target.get(0)) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
	}
}
$("#fixwidth").on("click", (MouseEvent) => changeMainWidthType(MouseEvent, "fixed"));
$("#reswidth").on("click", (MouseEvent) => changeMainWidthType(MouseEvent, "responsive"));