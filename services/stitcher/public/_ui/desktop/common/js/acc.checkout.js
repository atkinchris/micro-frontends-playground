function selectAddressForEdit(e) {
  $("input[id=editAddressCode]").val(e)
}

function refreshAddressSelection() {
  $("div.notSelected").show(), $("div.selected").hide();
  var e = $("input[id=selectedAddressCode]").val();
  "" != e && ($("div[id=notSelected" + e + "]").hide(), $("div[id=selected" + e + "]").show(), $("div[id=selected" + e + "]").addClass("showThisButton"), $("div.notSelected .tuButton").css("background", "#fff"), $("div.notSelected .tuButton").css("color", "#000", "important")), refreshContinueButton()
}

function refreshNamedDeliveryDateSelection() {
  var e = $("input[id=showNamedDelivery]").val(),
    i = $("input[id=enableNamedDelivery]").val();
  "true" == e && "true" == i ? $("div[id=namedDeliveryDate]").show() : $("div[id=namedDeliveryDate]").hide()
}

function refreshContinueButton() {
  "" != $("input[id=selectedAddressCode]").val() && "" != $("input[id=selectedDeliveryMethod]").val() && "click-and-collect" != $("input[id=selectedDeliveryMethod]").val() ? "premium-delivery" == $("input[id=selectedDeliveryMethod]").val() && "" == $("select[id=namedDeliveryDate]").val() && "true" == $("input[id=enableNamedDelivery]").val() ? ($("button[id=continue]").attr("disabled", "disabled"), $("button[id=continue]").addClass("disabled")) : ($("button[id=continue]").removeAttr("disabled"), $("button[id=continue]").removeClass("disabled")) : ($("button[id=continue]").attr("disabled", "disabled"), $("button[id=continue]").addClass("disabled"))
}

function refreshDeliveryType() {
  var e = $("input[id=selectedDeliveryType]").val();
  if ("" != e) {
    var i = $("input[id=" + e + "]");
    i.parent().find(".toggleBlock").first()
  }
}

function selectDeliveryType(e) {
  $("input[id=selectedDeliveryType]").val(e), "home-delivery" == e && "click-and-collect" == $("input[id=selectedDeliveryMethod]").val() && $("input[id=selectedDeliveryMethod]").val("")
}

function selectDeliveryAddress(e) {
  $("input[id=selectedAddressCode]").val(e), refreshAddressSelection(), refreshContinueButton()
}

function selectDeliveryMode(e) {
  $("input[id=selectedDeliveryMethod]").val(e);
  var i = $("input[id=enableNamedDelivery]").val();
  "premium-delivery" == e && "true" == i ? $("input[id=showNamedDelivery]").val(!0) : $("input[id=showNamedDelivery]").val(!1), refreshContinueButton(), refreshNamedDeliveryDateSelection()
}

function editExistingDeliveryAddress(e) {
  $("input[id=addressId]").val(e), $("input[id=selectedAddressCode]").val(e), $("input[id=editAddress]").val(!0), $("#addNewDeliveryAddress").hide(), refreshAddressSelection(), refreshContinueButton()
}

function deliveryAddressContinue() {
  $("input[id=continue]").val(!0)
}

function clearAddressForm() {
  $('input[id^="address\\."]').val(""), $('select[id^="address\\."]').val(""), $('select[id="address.title"]').val(null), $("input[id=addressDeliveryhouseNumberOrName]").val(""), $("input[id=addressDeliveryLine1]").val(""), $("input[id=addressDeliveryLine2]").val(""), $("input[id=addressDeliveryTownCity]").val("")
}
ACC.checkout = {
  spinner: $("<img id='taxesEstimateSpinner' src='" + ACC.config.commonResourcePath + "/images/spinner.gif' />"),
  bindAll: function() {
    this.bindCheckO()
  },
  bindCheckO: function() {
    var e = !1;
    $(".doCheckoutBut").click(function() {
      return e = ACC.pickupinstore.validatePickupinStoreCartEntires(), e || (window.location = checkoutUrl), !1
    }), $(".doFlowSelectedChange").change(function() {
      "multistep-pci" == $("#selectAltCheckoutFlow").attr("value") ? $("#selectPciOption").css("display", "") : $("#selectPciOption").css("display", "none")
    }), $(".doCheckoutBut").click(function() {
      if (!e) {
        var i = $("#selectAltCheckoutFlow").attr("value");
        window.location = checkoutUrl
      }
      return !1
    }), $("#estimateTaxesButton").click(function() {
      $("#zipCodewrapperDiv").removeClass("form_field_error"), $("#countryWrapperDiv").removeClass("form_field_error"), $("div#selectAValidZipCode").hide(), $("div#selectAValidCountry").hide(), "" == $("#zipCode").val() ? ($("div#selectAValidZipCode").show().focus(), $("#zipCodewrapperDiv").addClass("form_field_error")) : "" == $("#countryIso").val() ? ($("div#selectAValidCountry").show().focus(), $("#countryWrapperDiv").addClass("form_field_error")) : ($("#order_totals_container").append(ACC.checkout.spinner), $.getJSON("cart/estimate", {
        zipCode: $("#zipCode").val(),
        isocode: $("#countryIso").val()
      }, function(e) {
        $("#estimatedTotalTax").text(e.totalTax.formattedValue), $("#estimatedTotalPrice").text(e.totalPrice.formattedValue), $(".estimatedTotals").show(), $(".realTotals").hide(), $("#taxesEstimateSpinner").remove()
      }))
    }), $("#cancelExistingAddressEdit").click(function(e) {
      e.preventDefault(), $("input[id=editAddress]").val(!0), $(".addressform_button_panel").slideToggle(), $("#addNewDeliveryAddress").show(), refreshContinueButton(), refreshAddressSelection()
    }), $("#addNewDeliveryAddress").click(function(e) {
      e.preventDefault(), clearAddressForm(), $(".addressform_button_panel").slideToggle(), $("input[id=editAddress]").val(!1), $("#addNewDeliveryAddress").hide(), $("input[id=selectedAddressCode]").val(null), $(".newDeliveryAddressLabel").show(), $(".existingDeliveryAddressLabel").hide(), $("#cancelExistingAddressEdit").hide(), $(".lookupAddressFields").hide(), $("#searchForAddressLink").hide(), $("#findAddressLink").show(), $("#enterManuallyLink").show(), refreshContinueButton(), refreshAddressSelection()
    })
  }
}, $(".deliveryTypeToggle").click(function() {
  var e = $(this).parent().find(".toggleBlock").first();
  $(".deliveryTypeToggle").each(function() {
    $(this).parent().find(".toggleBlock").first().slideUp(), $(this).removeAttr("checked")
  }), e.is(":hidden") && ($(this).attr("checked", "true"), e.slideDown())
}), $(document).ready(function() {
  ACC.checkout.bindAll(), refreshDeliveryType(), refreshAddressSelection(), refreshContinueButton(), refreshNamedDeliveryDateSelection()
});
