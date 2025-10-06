"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  HabiticaAvatar: () => HabiticaAvatar_default
});
module.exports = __toCommonJS(index_exports);

// src/components/HabiticaAvatar/HabiticaAvatar.tsx
var import_react3 = require("react");
var import_moment = __toESM(require("moment"), 1);

// src/components/HabiticaSprite/HabiticaSprite.tsx
var import_react = __toESM(require("react"), 1);

// src/lib/sprites.ts
var BASE_URL = "https://habitica-assets.s3.amazonaws.com/mobileApp/images";
var DEFAULT_EXTENSION = "png";
var getSpriteUrl = (fileName, ext = DEFAULT_EXTENSION, baseUrl = BASE_URL) => {
  return `${baseUrl}/${fileName}.${ext}`;
};
var imageDetailsCache = /* @__PURE__ */ new Map();
var loadSpriteDetails = async (fileName) => {
  if (!fileName) {
    return null;
  }
  if (imageDetailsCache.has(fileName)) {
    return imageDetailsCache.get(fileName);
  }
  const tryFormat = (format) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = `${BASE_URL}/${fileName}.${format}`;
      img.onload = () => {
        const result = { width: img.width, height: img.height, format };
        imageDetailsCache.set(fileName, result);
        resolve(result);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = url;
    });
  };
  const pngResult = await tryFormat("png");
  if (pngResult) {
    return pngResult;
  }
  return tryFormat("gif");
};

// src/lib/helpers.ts
var isDefined = (value) => {
  return value !== void 0 && value !== null;
};
var createClassName = (...classes) => {
  const definedClasses = classes.filter((className) => isDefined(className) && className !== false && className !== "");
  if (definedClasses.length === 0) {
    return "";
  }
  if (definedClasses.length === 1) {
    return definedClasses[0];
  }
  return definedClasses.join(" ");
};

// src/components/HabiticaSprite/HabiticaSprite.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var HabiticaSprite = ({
  className,
  fileName,
  style,
  wrapper = "span",
  onClick,
  children
}) => {
  const Wrapper = wrapper;
  const [inlineStyles, setInlineStyles] = import_react.default.useState(void 0);
  if (wrapper === "span" && !isDefined(fileName)) {
    return null;
  }
  (0, import_react.useEffect)(() => {
    const fetchSpriteDetails = async () => {
      const details = await loadSpriteDetails(fileName);
      setInlineStyles({
        width: details ? `${details.width}px` : void 0,
        height: details ? `${details.height}px` : void 0,
        backgroundImage: details ? `url(${getSpriteUrl(fileName, details.format)})` : void 0,
        ...style
      });
    };
    fetchSpriteDetails();
  }, [fileName]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrapper, { className: createClassName(fileName, className), onClick, style: inlineStyles, children: isDefined(children) && children });
};
var HabiticaSprite_default = HabiticaSprite;

// src/components/ClassBadge/ClassBadge.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ICON_URLS = {
  warrior: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/warrior.svg",
  rogue: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/rogue.svg",
  healer: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/healer.svg",
  wizard: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/wizard.svg"
};
var ClassBadge = ({ memberClass, badgeSize = 32, className = "" }) => {
  const [svg, setSvg] = (0, import_react2.useState)("");
  (0, import_react2.useEffect)(() => {
    let isMounted = true;
    const url = ICON_URLS[memberClass];
    if (url) {
      fetch(url).then((res) => res.text()).then((data) => {
        if (isMounted) setSvg(data);
      }).catch(() => {
        if (isMounted) setSvg("");
      });
    } else {
      setSvg("");
    }
    return () => {
      isMounted = false;
    };
  }, [memberClass]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: `class-badge d-flex justify-content-center${className ? " " + className : ""}`,
      style: {
        // CSS variable for badge size
        ...{ ["--badge-size"]: badgeSize + "px" }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "align-self-center svg-icon",
          "aria-label": memberClass,
          dangerouslySetInnerHTML: { __html: svg }
        }
      )
    }
  );
};
var ClassBadge_default = ClassBadge;

// src/lib/foolPet.ts
var SPECIAL_PETS = [
  "Bear-Veteran",
  "BearCub-Polar",
  "Cactus-Veteran",
  "Dragon-Hydra",
  "Dragon-Veteran",
  "Fox-Veteran",
  "Gryphatrice-Jubilant",
  "Gryphon-Gryphatrice",
  "Gryphon-RoyalPurple",
  "Hippogriff-Hopeful",
  "Jackalope-RoyalPurple",
  "JackOLantern-Base",
  "JackOLantern-Ghost",
  "JackOLantern-Glow",
  "JackOLantern-RoyalPurple",
  "Lion-Veteran",
  "MagicalBee-Base",
  "Mammoth-Base",
  "MantisShrimp-Base",
  "Orca-Base",
  "Phoenix-Base",
  "Tiger-Veteran",
  "Turkey-Base",
  "Turkey-Gilded",
  "Wolf-Cerberus",
  "Wolf-Veteran"
];
var BASE_PETS = [
  "BearCub",
  "Cactus",
  "Dragon",
  "FlyingPig",
  "Fox",
  "LionCub",
  "PandaCub",
  "TigerCub",
  "Wolf"
];
function foolPet(pet, prank) {
  if (!pet) return `Pet-TigerCub-${prank}`;
  if (SPECIAL_PETS.includes(pet)) {
    return `Pet-Dragon-${prank}`;
  }
  const dashIdx = pet.indexOf("-");
  const species = dashIdx !== -1 ? pet.slice(0, dashIdx) : pet;
  if (BASE_PETS.includes(species)) {
    return `Pet-${species}-${prank}`;
  }
  return `Pet-BearCub-${prank}`;
}

// src/components/HabiticaAvatar/HabiticaAvatar.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var HabiticaAvatar = ({
  debugMode = false,
  member,
  avatarOnly = false,
  showClassBadge = false,
  withBackground = false,
  overrideAvatarGear = {},
  width = "141px",
  height = "147px",
  centerAvatar = false,
  spritesMargin = "0 auto 0 24px",
  overrideTopPadding = null,
  showVisualBuffs = true,
  showWeapon = true,
  flatGear = {},
  currentEventList = [],
  onClick
}) => {
  const costumeClass = (0, import_react3.useMemo)(
    () => member?.preferences?.costume ? "costume" : "equipped",
    [member?.preferences?.costume]
  );
  const getGearClass = (0, import_react3.useCallback)(
    (gearType) => {
      if (!member) return "";
      let result = member.items.gear[costumeClass][gearType];
      if (overrideAvatarGear && overrideAvatarGear[gearType]) {
        result = overrideAvatarGear[gearType];
      }
      return result;
    },
    [member, costumeClass, overrideAvatarGear]
  );
  const hairClass = (0, import_react3.useCallback)(
    (slot) => {
      if (overrideAvatarGear?.hair) {
        if (overrideAvatarGear.hair[slot]) {
          return `hair_${slot}_${overrideAvatarGear.hair[slot]}_${member.preferences.hair.color}`;
        }
        if (overrideAvatarGear.hair.color) {
          return `hair_${slot}_${member.preferences.hair[slot]}_${overrideAvatarGear.hair.color}`;
        }
      }
      return `hair_${slot}_${member.preferences.hair[slot]}_${member.preferences.hair.color}`;
    },
    [member, overrideAvatarGear]
  );
  const hideGear = (0, import_react3.useCallback)(
    (gearType) => {
      if (!member) return true;
      if (!showWeapon) return true;
      if (gearType === "weapon") {
        const equippedWeapon = member.items.gear[costumeClass][gearType];
        if (!equippedWeapon) return false;
        const equippedIsTwoHanded = flatGear[equippedWeapon]?.twoHanded;
        const hasOverrideShield = overrideAvatarGear && overrideAvatarGear.shield;
        return equippedIsTwoHanded && hasOverrideShield;
      } else if (gearType === "shield") {
        const overrideWeapon = overrideAvatarGear && overrideAvatarGear.weapon;
        const overrideIsTwoHanded = overrideWeapon && flatGear[overrideWeapon]?.twoHanded;
        return overrideIsTwoHanded;
      }
      return false;
    },
    [member, showWeapon, costumeClass, flatGear, overrideAvatarGear]
  );
  const showAvatar = (0, import_react3.useCallback)(() => {
    if (!member) return false;
    if (!showVisualBuffs) return true;
    const { buffs } = member.stats;
    return !buffs.snowball && !buffs.spookySparkles && !buffs.shinySeed && !buffs.seafoam;
  }, [member, showVisualBuffs]);
  const getPetClass = (0, import_react3.useCallback)(() => {
    const foolEvent = currentEventList?.find(
      (event) => event.aprilFools && (0, import_moment.default)().isBetween(event.start, event.end)
    );
    if (foolEvent) {
      return foolPet(member.items.currentPet, foolEvent.aprilFools);
    }
    if (member?.items.currentPet) return `Pet-${member.items.currentPet}`;
    return "";
  }, [member, currentEventList]);
  const hasClass = (0, import_react3.useMemo)(() => {
    if (!member) return false;
    return !!member.stats.class;
  }, [member]);
  const paddingTop = (0, import_react3.useMemo)(() => {
    if (overrideTopPadding) return overrideTopPadding;
    let val = "24px";
    if (!avatarOnly) {
      if (member?.items.currentPet) val = "24px";
      if (member?.items.currentMount) val = "0px";
    }
    return val;
  }, [overrideTopPadding, avatarOnly, member]);
  const backgroundClass = (0, import_react3.useMemo)(() => {
    if (member) {
      const { background } = member.preferences;
      const allowToShowBackground = !avatarOnly || withBackground;
      if (overrideAvatarGear && overrideAvatarGear.background) {
        return `background_${overrideAvatarGear.background}`;
      }
      if (background && allowToShowBackground) {
        return `background_${background}`;
      }
    }
    return "";
  }, [member, avatarOnly, withBackground, overrideAvatarGear]);
  const topLevelClassList = (0, import_react3.useMemo)(() => {
    const classes = [];
    if (debugMode) classes.push("debug");
    if (centerAvatar) classes.push("centered-avatar");
    return createClassName(...classes);
  }, [backgroundClass, debugMode, centerAvatar]);
  const visualBuffs = (0, import_react3.useMemo)(() => {
    if (!member) return {};
    return {
      snowball: `avatar_snowball_${member.stats.class}`,
      spookySparkles: "ghost",
      shinySeed: `avatar_floral_${member.stats.class}`,
      seafoam: "seafoam_star"
    };
  }, [member]);
  const skinClass = (0, import_react3.useMemo)(() => {
    if (!member) return "";
    if (overrideAvatarGear?.skin) {
      return `skin_${overrideAvatarGear.skin}`;
    }
    const baseClass = `skin_${member.preferences.skin}`;
    return `${baseClass}${member.preferences.sleep ? "_sleep" : ""}`;
  }, [member, overrideAvatarGear]);
  const shirtClass = (0, import_react3.useMemo)(() => {
    if (!member) return "";
    if (overrideAvatarGear?.shirt) {
      return `${member.preferences.size}_shirt_${overrideAvatarGear.shirt}`;
    }
    return `${member.preferences.size}_shirt_${member.preferences.shirt}`;
  }, [member, overrideAvatarGear]);
  const specialMountClass = (0, import_react3.useMemo)(() => {
    if (!avatarOnly && member?.items.currentMount && member?.items.currentMount.includes("Kangaroo")) {
      return "offset-kangaroo";
    }
    return "";
  }, [avatarOnly, member]);
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(member);
  };
  if (!member.preferences) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    HabiticaSprite_default,
    {
      className: createClassName("avatar", topLevelClassList),
      fileName: backgroundClass,
      style: { width, height, paddingTop },
      onClick: handleClick,
      wrapper: "div",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "character-sprites", style: { margin: spritesMargin }, children: [
          !avatarOnly && member.items.currentMount && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `Mount_Body_${member.items.currentMount}` }),
          Object.entries(visualBuffs).map(
            ([item, klass]) => member.stats.buffs[item] && showVisualBuffs ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: klass }, item) : null
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `hair_flower_${member.preferences.hair.flower}` }),
          showAvatar() && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `chair_${member.preferences.chair}`, className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("back"), className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: skinClass, className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: shirtClass, className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `head_0`, className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `${member.preferences.size}_${getGearClass("armor")}`, className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("back_collar"), className: specialMountClass }),
            ["bangs", "base", "mustache", "beard"].map((type) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: hairClass(type), className: specialMountClass }, type)),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("body"), className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("eyewear"), className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("head"), className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("headAccessory"), className: specialMountClass }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `hair_flower_${member.preferences.hair.flower}`, className: specialMountClass }),
            !hideGear("shield") && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("shield"), className: specialMountClass }),
            !hideGear("weapon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getGearClass("weapon"), className: createClassName(specialMountClass, "weapon") })
          ] }),
          member.preferences.sleep && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: "zzz" }),
          !avatarOnly && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            member.items.currentMount && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: `Mount_Head_${member.items.currentMount}` }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HabiticaSprite_default, { fileName: getPetClass(), className: "current-pet" })
          ] })
        ] }),
        hasClass && showClassBadge && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ClassBadge_default, { className: "under-avatar", memberClass: member.stats.class })
      ]
    }
  );
};
var HabiticaAvatar_default = HabiticaAvatar;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HabiticaAvatar
});
