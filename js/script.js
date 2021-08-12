//datepicker

const calendar = document.querySelector(".settings-blog__input-date");

if (calendar) {
  $("#datepicker-input").datepicker({
    language: "en",
    autoClose: true,
  });
}

if (calendar) {
  $(".settings-blog__input-time").datepicker({
    language: "en",
    // autoClose: true,
    timepicker: true,
    onlyTimepicker: true,
    inline: false,
  });
}

//static-calendar

const hugeCalendar = document.querySelector(".calendar");

var eventDates = [1, 10, 12, 22],
  $picker = $("#custom-cells"),
  $content = $("#custom-cells-events"),
  sentences = ["one", "two"];

if (hugeCalendar) {
  $("#datepicker-calendar").datepicker({
    language: "en",
    autoClose: true,
    inline: true,
    onRenderCell: function (date, cellType) {
      var currentDate = date.getDate();

      // Добавляем вспомогательный элемент, если число содержится в `eventDates`
      if (cellType == "day" && eventDates.indexOf(currentDate) != -1) {
        return {
          html: currentDate + '<span class="dp-note"></span>',
        };
      }
    },
    onSelect: function onSelect(fd, date) {
      var title = "",
        content = "";

      // Если выбрана дата с событием, то отображаем его
      if (date && eventDates.indexOf(date.getDate()) != -1) {
        title = fd;
        content = sentences[Math.floor(Math.random() * eventDates.length)];
      }

      $("strong", $content).html(title);
      $("p", $content).html(content);
    },
  });
}

const accordion = (triggersSelector, itemsSelector) => {
  var btns = document.querySelectorAll(triggersSelector);
  var blocks = document.querySelectorAll(itemsSelector);

  const removeBtnsClass = (classActive = "active") => {
    btns.forEach((btn) => {
      btn.classList.remove(classActive);
    });
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let activeState = this.classList.contains("active");
      removeBtnsClass();
      if (!activeState) {
        this.classList.add("active");
      }
    });
  });
};

const openedBlock = (triggerBtn, block) => {
  const btns = document.querySelectorAll(triggerBtn);
  const blocks = document.querySelectorAll(block);
  btns.forEach((btn, index) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      blocks.forEach((item, idx) => {
        if (index === idx) {
          item.classList.toggle("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  });
};

const tabs = (
  headerSelector,
  tabSelector,
  contentSelector,
  btnNextTab,
  activeClass = "active"
) => {
  const header = document.querySelector(headerSelector);
  const tab = document.querySelectorAll(tabSelector);
  const content = document.querySelectorAll(contentSelector);
  const next = document.querySelector(btnNextTab);
  const counter = document.querySelector(".remodal-edit__counter-item");

  if (content && tab && content && next) {
    function hideTabContent() {
      content.forEach((item) => {
        item.style.display = "none";
      });

      tab.forEach((item) => {
        item.classList.remove(activeClass);
      });
    }

    function showTabContent(i = 0) {
      content[i].style.display = "block";
      tab[i].classList.add(activeClass);
      if (tab[i] === tab[3]) {
        next.textContent = "save";
      }
    }

    hideTabContent();
    showTabContent();

    next.addEventListener("click", () => {
      let clickItem = "must";
      tab.forEach((item, i) => {
        if ("must" === clickItem || "need" === clickItem) {
          if ("need" === clickItem) {
            item.click();
            clickItem = "done";
          }

          if (item.classList.contains(activeClass) && "must" === clickItem) {
            clickItem = "need";
          }
        }
      });
    });

    header.addEventListener("click", (e) => {
      const target = e.target;

      if (
        target &&
        (target.classList.contains(tabSelector.replace(/\./, "")) ||
          target.parentNode.classList.contains(tabSelector.replace(/\./, "")))
      ) {
        tab.forEach((item, i) => {
          if (target == item || target.parentNode == item) {
            hideTabContent();
            showTabContent(i);
            counter.textContent = `${i + 1}`;
          }
          console.log(i);
        });
      }
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  accordion(".sidebar__dropdown", ".sidebar__submenu");
  accordion(".submission-table__row", ".wedding-edit");
  accordion(".vendors-table__row", ".plan-edit");
  accordion(".colors-table__row", ".color-edit");
  accordion(".line-table__row", ".edit-block");
  accordion(".menu-table__row", ".edit-block");
  accordion(".highlights-table__row", ".edit-block");
  accordion(".gallery-table__row", ".gallery-edit-block");
  accordion(".social-table__row", ".social-edit-block");

  openedBlock(".media__edit-btn--popup", ".remodal-post-photo__edit");
  openedBlock(".media__preview--popup", ".remodal-post-photo__edit");

  openedBlock(".color__add-circle", ".color__change");
  openedBlock(".homepage-row", ".edit-block");
  openedBlock(".slider-row", ".edit-block");
  openedBlock(".table__edit", ".plan-edit");
  openedBlock(".reviews-table__row", ".reviews-edit");
  openedBlock(".vendors-list__row", ".vendors-list__edit");
  openedBlock(".table__row--post", ".edit-block");

  //tabs
  tabs(
    ".remodal-edit__items",
    ".remodal-edit__item",
    ".remodal-edit__img",
    ".btn-next"
  );
  tabs(
    ".remodal-edit__items--popup",
    ".remodal-edit__item--popup",
    ".remodal-edit__img--popup",
    ".btn-next--popup"
  );
  tabs(
    ".gallery-edit-block__type",
    ".category__btn",
    ".gallery-edit-block__tab"
  );
});

const template = document.getElementById("template");

if (document.querySelector(".vendor-type__link")) {
  tippy(".vendor-type__link", {
    content: template.innerHTML,
    allowHTML: true,
    interactive: true,
  });
}

const templateTooltip = document.getElementById("templateTooltip");

if (document.querySelector(".post-field__change-btn")) {
  tippy(".post-field__change-btn", {
    content: templateTooltip.innerHTML,
    allowHTML: true,
    interactive: true,
    placement: "right",
    interactiveBorder: 50,
    // hideOnClick: false,
    // trigger: 'click'
  });
}

$(document).ready(function () {
  $("select").niceSelect();
});

var simpleListItem = document.querySelector("#simpleList");

var $sortable = null;

if (simpleListItem) {
  var fixHelper = function (e, ui) {
    return '<div class="sortable-helper"></div>';
  };

  $sortable = $("#simpleList").sortable({
    helper: fixHelper,
    // helper: 'original',
    axis: "y",
    handle: ".post-field__change-btn",
    cursor: "move",
    revert: 100,
    items: ".post-field__sort-item",
    placeholder: "placeh ui-state-highlight-blue",
  });
}

var tableSort = document.querySelector("#tableSort");

if (tableSort) {
  var fixHelper = function (e, ui) {
    return '<div class="sortable-helper"></div>';
  };

  $sortable = $("#tableSort").sortable({
    helper: fixHelper,
    // helper: 'original',
    axis: "y",
    handle: ".table__change-btn",
    cursor: "move",
    revert: 100,
    items: ".table__sort-item",
    placeholder: "placeh ui-state-highlight-blue",
  });
}

const checkbox = document.querySelector(".checkbox-date");
const rowDate = document.querySelector(".settings-blog__row--date");
const textHidden = document.querySelector(".settings-blog__text--hidden");
const rowMargin = document.querySelector(".settings-blog__row--margin");

if (checkbox) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      rowDate.classList.add("active");
      textHidden.style.display = "none";
      rowMargin.style.marginBottom = "0";
    } else {
      rowDate.classList.remove("active");
      textHidden.style.display = "block";
      rowMargin.style.marginBottom = "0";
    }
  });
}

const favoriteBtns = document.querySelectorAll(".table__favorite");

if (favoriteBtns) {
  favoriteBtns.forEach((favorite) => {
    favorite.addEventListener("click", () => {
      favorite.classList.toggle("checked");
    });
  });
}

const checkBtnsTable = document.querySelectorAll(".table__check");

if (checkBtnsTable) {
  checkBtnsTable.forEach((checkBtn) => {
    checkBtn.addEventListener("click", () => {
      checkBtn.classList.toggle("checked");
    });
  });
}

// const editorItem = document.getElementById('#editor');

// BalloonEditor.create(document.querySelector('#editor')).catch((error) => {
// 	console.error(error);
// });

const notificationIcon = document.querySelector(".notification-icon");

if (notificationIcon) {
  const openNotificationsInfo = () => {
    let notificationIconSvg = document.querySelector(".notification-icon svg");
    let notificationInfo = document.querySelector(".notification");

    notificationIcon.addEventListener("click", () => {
      notificationInfo.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      const infoBlock =
        target == notificationInfo || notificationInfo.contains(target);
      const notificationIconTarget =
        target == notificationIcon || target == notificationIconSvg;

      if (
        !infoBlock &&
        !notificationIconTarget &&
        notificationInfo.classList.contains("active")
      ) {
        notificationInfo.classList.remove("active");
      }
    });
  };
  openNotificationsInfo();
}
3;

//baloon editor

var textareaFields = document.querySelectorAll(".balloon");
var text_changed = false;

if (textareaFields.length > 0) {
  textareaFields.forEach((textarea) => {
    BalloonEditor.create(textarea, {
      toolbar: {
        items: ["bold", "italic", "|", "undo", "redo", "|", "link"],
      },
    })
      .then((editor) => {
        window.CKEditor5 = editor;

        detectTextChanges(editor);
        detectFocusOut(editor);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  function detectFocusOut(editor) {
    editor.ui.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
      if (!isFocused && text_changed) {
        text_changed = false;
        updateEditor(editor);
      }
    });
  }

  function detectTextChanges(editor) {
    editor.model.document.on("change:data", (e, i) => {
      text_changed = true;
      updateEditor(editor);
    });
  }

  function updateEditor(editor) {
    let element = $(editor.sourceElement);
    if (element) {
      let dataName = element.attr("data-name");
      let thisTextarea = $('textarea[name="' + dataName + '"]');
      thisTextarea.val(editor.getData());
      thisTextarea.trigger("change");
    }
  }
}

const addPostBtn = document.querySelector(".post-field-add");
const postTypesBlock = document.querySelector(".post-field__add-tooltip");

if (addPostBtn) {
  $(".post-field-add").click(function () {
    $(".post-field__add-tooltip").toggle("slow", function () {});
  });
}

const categoryBlock = document.querySelector(
  ".blog-posts__category .category--blog"
);

if (categoryBlock) {
  var $bl = $(".blog-posts__category"),
    $th = $(".category--blog"),
    blW = $bl.outerWidth(),
    blSW = $bl[0].scrollWidth,
    wDiff = blSW / blW - 1, // widths difference ratio
    mPadd = 60, // Mousemove Padding
    damp = 20, // Mousemove response softness
    mX = 0, // Real mouse position
    mX2 = 0, // Modified mouse position
    posX = 0,
    mmAA = blW - mPadd * 2, // The mousemove available area
    mmAAr = blW / mmAA; // get available mousemove fidderence ratio

  $bl.mousemove(function (e) {
    mX = e.pageX - this.offsetLeft;
    mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
  });

  setInterval(function () {
    posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"
    $th.css({ marginLeft: -posX * wDiff });
  }, 10);
}

$(".gallery-edit-block").each(function () {
  let ths = $(this);
  ths.find(".gallery-edit-block__tab").not(":first").hide();
  ths
    .find(".category__btn")
    .click(function () {
      ths
        .find(".category__btn")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
      ths.find(".gallery-edit-block__tab").hide().eq($(this).index()).fadeIn();
    })
    .eq(0)
    .addClass("active");
});

// if (chooseAllCheckbox) {

// }
(() => {
  let checkboxForStore = document.querySelectorAll(".checkbox__input");
  let chooseAllCheckbox = document.querySelector(
    ".checkbox-all .checkbox__input"
  );
  let tableAddBtn = document.querySelector(".table__add");

  checkboxForStore.forEach((el) => {
    el.addEventListener("change", function () {
      if (el.checked) {
        tableAddBtn.classList.add("table__add--delete");
        tableAddBtn.textContent = "Delete";
      } else {
        tableAddBtn.classList.remove("table__add--delete");
        tableAddBtn.innerHTML =
          '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.375 7.6875C12.375 7.47656 12.1641 7.26562 11.9531 7.26562H8.85938V4.17188C8.85938 3.96094 8.64844 3.75 8.4375 3.75H7.3125C7.06641 3.75 6.89062 3.96094 6.89062 4.17188V7.26562H3.79688C3.55078 7.26562 3.375 7.47656 3.375 7.6875V8.8125C3.375 9.05859 3.55078 9.23438 3.79688 9.23438H6.89062V12.3281C6.89062 12.5742 7.06641 12.75 7.3125 12.75H8.4375C8.64844 12.75 8.85938 12.5742 8.85938 12.3281V9.23438H11.9531C12.1641 9.23438 12.375 9.05859 12.375 8.8125V7.6875ZM15.75 2.0625C15.75 1.14844 14.9766 0.375 14.0625 0.375H1.6875C0.738281 0.375 0 1.14844 0 2.0625V14.4375C0 15.3867 0.738281 16.125 1.6875 16.125H14.0625C14.9766 16.125 15.75 15.3867 15.75 14.4375V2.0625ZM14.0625 14.2266C14.0625 14.3672 13.957 14.4375 13.8516 14.4375H1.89844C1.75781 14.4375 1.6875 14.3672 1.6875 14.2266V2.27344C1.6875 2.16797 1.75781 2.0625 1.89844 2.0625H13.8516C13.957 2.0625 14.0625 2.16797 14.0625 2.27344V14.2266Z" fill="currentColor" /> </svg>' +
          "Add";
      }
    });
  });

  if (chooseAllCheckbox) {
    chooseAllCheckbox.onchange = function (e) {
      var el = e.target || e.srcElement;
      for (var i = 0; i < checkboxForStore.length; i++) {
        if (el.checked) {
          checkboxForStore[i].checked = true;
        } else {
          checkboxForStore[i].checked = false;
        }
      }
    };
  }
})();

// const instance = tippy(document.querySelector('.post-field__change-btn.no-tippy'));

// // instance.hide();
// console.log(instance);

$(".post-field__add-absolute").click(function () {
  $(".post-field__add-tooltip--sticky").toggle("slide");
  $(".post-field__add--svg");
});

$(document).click(function () {
  var container = $(".post-field__add-absolute");
  if (!container.is(event.target) && !container.has(event.target).length) {
    $(".post-field__add-tooltip--sticky").hide(
      "slide",
      { direction: "left" },
      800
    );
  }
});

function dropdownCardOpen(dropdownBtn, dropdownTitles,  dropdownContent, openClass) {
  const dropdownBtnList = document.querySelectorAll(dropdownBtn);
  const dropdownContentsList = document.querySelectorAll(`[dd-num]`);
  const dropdownTitlesList = document.querySelectorAll(dropdownTitles);
  if (dropdownBtnList[0]) {
    dropdownBtnList.forEach((elem, num) => {
      let dropdownContentNode = dropdownContentsList[num];

      elem.addEventListener("click", () => {
        if (!elem.classList.contains(openClass)) {
          elem.classList.add(openClass);
          dropdownTitlesList[num].classList.add(openClass);
          dropdownContentNode.parentNode.style.height = `${dropdownContentNode.clientHeight}px`;
          setTimeout(()=>{
            dropdownContentNode.parentNode.style.height = `0px`;
          },10);

        } else {
          elem.classList.remove(openClass);
          dropdownTitlesList[num].classList.remove(openClass);
          dropdownContentNode.parentNode.style.height = `${dropdownContentNode.clientHeight}px`;
          setTimeout(()=>{
            dropdownContentNode.parentNode.style.height = `auto`;
          },400);
        }
      });
    });
    dropdownTitlesList.forEach((elem, num) => {
      let dropdownContentNode = dropdownContentsList[num];
      elem.addEventListener("click", () => {
        if (!elem.classList.contains(openClass)) {
          elem.classList.add(openClass);
          dropdownBtnList[num].classList.add(openClass);
          dropdownContentNode.parentNode.style.height = `${dropdownContentNode.clientHeight}px`;
          setTimeout(()=>{
            dropdownContentNode.parentNode.style.height = `0px`;
          },10);
        } else {
          elem.classList.remove(openClass);
          dropdownBtnList[num].classList.remove(openClass);
          dropdownContentNode.parentNode.style.height = `${dropdownContentNode.clientHeight}px`;
          setTimeout(()=>{
            dropdownContentNode.parentNode.style.height = `auto`;
          },400);
        }
      });
    });
  }
}

dropdownCardOpen(".dd-open-btn", '.dd-title',".dd", "active");


const colorPickerBtns = document.querySelectorAll(".color__add-circle");
function pickerOpen(e) {
  let openPallet = document.querySelector(".color__change.active");
  if (
    !e.target.classList.contains("color__add-circle") &&
    openPallet &&
    !e.target.closest(".color__change.active")
  ) {
    openPallet.classList.remove("active");
    document.removeEventListener("click", pickerOpen);
  }
}

colorPickerBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    document.addEventListener("click", pickerOpen);
  });
});