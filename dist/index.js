// src/components/HabiticaAvatar/HabiticaAvatar.tsx
import { useMemo as useMemo2, useEffect as useEffect2, useState as useState2, useCallback } from "react";

// src/components/HabiticaSprite/HabiticaSprite.tsx
import { useMemo } from "react";

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
var getNestedProperty = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// src/components/HabiticaSprite/HabiticaSprite.tsx
import { jsx } from "react/jsx-runtime";
var HabiticaSprite = ({
  className,
  spriteDetails,
  style,
  wrapper = "span",
  onClick,
  children
}) => {
  const Wrapper = wrapper;
  const inlineStyles = useMemo(() => ({
    width: spriteDetails ? `${spriteDetails.width}px` : void 0,
    height: spriteDetails ? `${spriteDetails.height}px` : void 0,
    backgroundImage: spriteDetails ? `url(${spriteDetails.backgroundUrl})` : void 0,
    ...style
  }), [spriteDetails, style]);
  if (wrapper === "span" && !isDefined(spriteDetails)) {
    return null;
  }
  return /* @__PURE__ */ jsx(Wrapper, { className: createClassName(spriteDetails?.className, className), onClick, style: inlineStyles, children: isDefined(children) && children });
};
var HabiticaSprite_default = HabiticaSprite;

// src/components/ClassBadge/ClassBadge.tsx
import { useEffect, useState } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var ICON_URLS = {
  warrior: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/warrior.svg",
  rogue: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/rogue.svg",
  healer: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/healer.svg",
  wizard: "https://raw.githubusercontent.com/HabitRPG/habitica/e096d7ac42bb6bf5def2f8fdf71cd0afea10d755/website/client/src/assets/svg/wizard.svg"
};
var ClassBadge = ({ memberClass, badgeSize = 32, className = "" }) => {
  const [svg, setSvg] = useState("");
  useEffect(() => {
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
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: `class-badge d-flex justify-content-center${className ? " " + className : ""}`,
      style: {
        // CSS variable for badge size
        ...{ ["--badge-size"]: badgeSize + "px" }
      },
      children: /* @__PURE__ */ jsx2(
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
import moment from "moment";
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
var getAprilFoolsPrank = (currentEventList) => {
  const foolEvent = currentEventList?.find(
    (event) => event.aprilFools && moment().isBetween(event.start, event.end)
  );
  if (foolEvent) {
    return foolEvent.aprilFools;
  }
  return null;
};

// src/components/HabiticaAvatar/HabiticaAvatar.tsx
import { getHabiticaAvatarManifestItems, getHabiticaImagesMeta } from "habitica-avatar-manifest";

// src/lib/sprites.ts
var BASE_URL = "https://habitica-assets.s3.amazonaws.com/mobileApp/images";
var DEFAULT_EXTENSION = "png";
var getSpriteUrl = (fileName, ext = DEFAULT_EXTENSION, baseUrl = BASE_URL) => {
  return `${baseUrl}/${fileName}.${ext}`;
};
var getSpriteDetails = (imagesMeta, fileName) => {
  const pngBaseName = `${fileName}.png`;
  const gifBaseName = `${fileName}.gif`;
  const gifImageMeta = imagesMeta[gifBaseName];
  const pngImageMeta = imagesMeta[pngBaseName];
  if (gifImageMeta) {
    return gifImageMeta;
  } else if (pngImageMeta) {
    return pngImageMeta;
  }
  return null;
};
var avatarSpriteTypes = [
  "background",
  "chair",
  "gear.back",
  "gear.armor",
  // 'gear.back_collar',
  "gear.body",
  "gear.eyewear",
  "gear.head",
  "gear.headAccessory",
  "gear.shield",
  "gear.weapon",
  "head_0",
  "skin",
  "shirt",
  "hair.bangs",
  "hair.base",
  "hair.mustache",
  "hair.beard",
  "hair.flower",
  "sleep",
  "mount.head",
  "mount.body",
  "pet",
  "buff"
];
var getAvatarSprites = (userSettings, overrideAvatarGear, avatarManifestItems, imagesMeta, petPrank = null) => {
  const avatarSprites = {};
  avatarSpriteTypes.forEach((spriteType) => {
    const spriteFileName = getAvatarSettingImageUrl(
      userSettings,
      overrideAvatarGear,
      spriteType,
      avatarManifestItems,
      petPrank
    );
    if (!isDefined(spriteFileName)) return;
    const spriteDetails = getSpriteDetails(imagesMeta, spriteFileName);
    if (spriteDetails) {
      avatarSprites[spriteType] = {
        spriteType,
        className: spriteFileName,
        backgroundUrl: getSpriteUrl(spriteFileName, spriteDetails.format),
        width: spriteDetails.width,
        height: spriteDetails.height
      };
    }
  });
  return avatarSprites;
};
var getItemId = (userSettings, overrideAvatarGear, spriteType) => {
  switch (spriteType) {
    case "gear.back":
    case "gear.armor":
    //case 'gear.back_collar':
    case "gear.body":
    case "gear.eyewear":
    case "gear.head":
    case "gear.headAccessory":
    case "gear.shield":
    case "gear.weapon":
      const gearType = userSettings.preferences.costume ? "costume" : "equipped";
      const gearItemType = spriteType.split(".")[1];
      if (isDefined(overrideAvatarGear[gearItemType])) {
        return overrideAvatarGear[gearItemType];
      }
      return userSettings.items.gear[gearType][gearItemType];
    case "hair.bangs":
    case "hair.base":
    case "hair.mustache":
    case "hair.beard":
    case "hair.flower":
    case "hair.color":
      return getNestedProperty(overrideAvatarGear, spriteType) ?? getNestedProperty(userSettings.preferences, spriteType) ?? null;
    case "buff":
      return Object.entries(userSettings.stats.buffs).find(([_, isActive]) => isActive)?.[0] || null;
    case "sleep":
      return `${userSettings.preferences.sleep}`;
    case "background":
    case "chair":
    case "skin":
    case "shirt":
      return overrideAvatarGear[spriteType] || userSettings.preferences[spriteType];
    default:
      return spriteType;
  }
};
var getAvatarSettingImageUrl = (userSettings, overrideAvatarGear, spriteType, avatarManifestItems, petPrank = null) => {
  switch (spriteType) {
    case "gear.back":
    case "gear.armor":
    //case 'gear.back_collar':
    case "gear.body":
    case "gear.eyewear":
    case "gear.head":
    case "gear.headAccessory":
    case "gear.shield":
    case "gear.weapon":
      const gearItemId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const gearItemDetail = getNestedProperty(avatarManifestItems, `${spriteType}.${gearItemId}`);
      if (!gearItemDetail) return null;
      return gearItemDetail.imageFileNames.find((fileName) => {
        if (spriteType === "gear.armor") {
          return !fileName.startsWith("shop_") && fileName.includes(userSettings.preferences.size);
        }
        return !fileName.startsWith("shop_");
      }) || null;
    case "hair.bangs":
    case "hair.base":
    case "hair.mustache":
    case "hair.beard":
    case "hair.flower":
      const hairItemId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const hairColorId = getItemId(userSettings, overrideAvatarGear, "hair.color");
      const hairItemDetail = getNestedProperty(avatarManifestItems, `${spriteType}.${hairItemId}`);
      if (!hairItemDetail) return null;
      return hairItemDetail.imageFileNames.find((fileName) => {
        if (spriteType === "hair.flower") {
          return !fileName.startsWith("icon_");
        }
        return !fileName.startsWith("icon_") && fileName.includes(hairColorId);
      }) || null;
    case "mount.head":
    case "mount.body":
      const mountPart = spriteType === "mount.head" ? "Head" : "Body";
      const mountId = userSettings.items.currentMount;
      const mountDetail = mountId ? avatarManifestItems.mount[mountId] : void 0;
      if (!mountDetail) return null;
      return mountDetail.imageFileNames.find((fileName) => {
        return !fileName.startsWith("stable_") && fileName.includes(mountPart);
      }) || null;
    case "pet":
      const currentPetId = userSettings.items.currentPet;
      const petId = petPrank ? foolPet(currentPetId, petPrank) : currentPetId;
      const petDetail = petId ? avatarManifestItems.pet[petId] : void 0;
      if (!petDetail) return null;
      return petDetail.imageFileNames.find((fileName) => !fileName.startsWith("stable_")) || null;
    case "buff":
      const buffId = getItemId(userSettings, overrideAvatarGear, spriteType);
      if (!buffId) return null;
      const buffDetail = avatarManifestItems.buff[buffId] ?? avatarManifestItems.buff[`${buffId}_${userSettings.stats.class}`];
      return buffDetail?.imageFileNames.find((fileName) => !fileName.startsWith("icon_")) || null;
    case "background":
    case "chair":
      const itemId = getItemId(userSettings, overrideAvatarGear, spriteType);
      if (!itemId) return null;
      return avatarManifestItems[spriteType][itemId]?.imageFileNames.find((fileName) => !fileName.startsWith("icon_")) || null;
    case "skin":
      const skinId = getItemId(userSettings, overrideAvatarGear, spriteType);
      if (!skinId) return null;
      return avatarManifestItems[spriteType][skinId].imageFileNames.find((fileName) => {
        if (userSettings.preferences.sleep) {
          return !fileName.startsWith("icon_") && fileName.includes("sleep");
        }
        return !fileName.startsWith("icon_");
      }) || null;
    case "shirt":
      const shirtId = getItemId(userSettings, overrideAvatarGear, spriteType);
      const sizeId = userSettings.preferences.size;
      if (!shirtId) return null;
      return avatarManifestItems.body[spriteType][shirtId].imageFileNames.find((fileName) => !fileName.startsWith("icon_") && fileName.includes(sizeId)) || null;
    case "sleep":
      const isSleeping = userSettings.preferences[spriteType];
      return avatarManifestItems.sleep[`${isSleeping}`]?.imageFileNames[0] || null;
    default:
      return spriteType;
  }
};

// src/lib/base64Images.ts
var base64ImageCache = {};
var fetchBase64Images = async (urls, base64Url) => {
  const urlsToFetch = urls.filter((url) => !base64ImageCache[url]);
  if (urlsToFetch.length === 0) {
    return urls.map((url) => ({
      url,
      base64: base64ImageCache[url],
      source: "cache"
    }));
  }
  try {
    const urlParam = encodeURIComponent(urlsToFetch.join(","));
    const res = await fetch(`${base64Url}?urls=${urlParam}`);
    const data = await res.json();
    data.forEach((item) => {
      base64ImageCache[item.url] = item.base64;
    });
    const result = urls.map((url) => {
      if (base64ImageCache[url]) {
        return {
          url,
          base64: base64ImageCache[url],
          source: "cache"
        };
      } else {
        const fetchedItem = data.find((item) => item.url === url);
        return fetchedItem ? { ...fetchedItem, source: "fetch" } : { url, base64: "", source: "fetch" };
      }
    });
    return result;
  } catch (error) {
    console.error("Error fetching base64 images:", error);
    return [];
  }
};
var enrichAvatarSpritesWithBase64 = async (avatarSprites, base64Url) => {
  const urls = Object.values(avatarSprites).map((sprite) => sprite.backgroundUrl);
  const base64Images = await fetchBase64Images(urls, base64Url);
  const enrichedSprites = { ...avatarSprites };
  Object.values(avatarSprites).forEach((sprite) => {
    const base64Image = base64Images.find((img) => img.url === sprite.backgroundUrl);
    if (base64Image) {
      enrichedSprites[sprite.spriteType] = {
        ...sprite,
        backgroundUrl: base64Image.base64
      };
    }
  });
  return enrichedSprites;
};

// src/components/HabiticaAvatar/HabiticaAvatar.tsx
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var HabiticaAvatar = ({
  member,
  debugMode = false,
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
  onClick,
  base64Url,
  onLoadingStart,
  onLoadingEnd,
  ...props
}) => {
  const [avatarSpritesDetails, setAvatarSpritesDetails] = useState2(null);
  const [loadingImages, setLoadingImages] = useState2({ total: 0, loaded: 0 });
  const [loadingAvatar, setLoadingAvatar] = useState2(false);
  const [staticData, setStaticData] = useState2({ imagesMeta: null, avatarManifestItems: null });
  useEffect2(() => {
    const fetchStaticData = async () => {
      if (props.imagesMeta && props.avatarManifestItems) {
        const { imagesMeta, avatarManifestItems } = props;
        setStaticData({ imagesMeta, avatarManifestItems });
      } else {
        const [imagesMeta, avatarManifestItems] = await Promise.all([
          getHabiticaImagesMeta(),
          getHabiticaAvatarManifestItems()
        ]);
        setStaticData({ imagesMeta, avatarManifestItems });
      }
    };
    fetchStaticData();
  }, [props.imagesMeta, props.avatarManifestItems]);
  const handleImageLoad = useCallback(() => {
    setLoadingImages((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
  }, []);
  const setupImageTracking = useCallback((sprites, loadingImages2) => {
    if (loadingImages2.total > loadingImages2.loaded) return;
    const imageUrls = Object.values(sprites).filter((sprite) => isDefined(sprite) && isDefined(sprite.backgroundUrl)).map((sprite) => sprite.backgroundUrl).filter((url) => isDefined(url) && url !== "");
    const totalImages = imageUrls.length;
    setLoadingImages({ total: totalImages, loaded: 0 });
    if (totalImages === 0) {
      setLoadingAvatar(false);
      onLoadingEnd?.();
      return;
    }
    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = url;
    });
  }, []);
  const petPrank = useMemo2(() => getAprilFoolsPrank(currentEventList), [currentEventList]);
  useEffect2(() => {
    const loadSpriteDetails = async () => {
      if (!staticData.imagesMeta || !staticData.avatarManifestItems) return;
      setLoadingAvatar(true);
      onLoadingStart?.();
      const avatarSprites = getAvatarSprites(
        member,
        overrideAvatarGear,
        staticData.avatarManifestItems,
        staticData.imagesMeta,
        petPrank
      );
      if (isDefined(base64Url)) {
        const enrichedSprites = await enrichAvatarSpritesWithBase64(avatarSprites, base64Url);
        setAvatarSpritesDetails(enrichedSprites);
        setupImageTracking(enrichedSprites, loadingImages);
      } else {
        setAvatarSpritesDetails(avatarSprites);
        setupImageTracking(avatarSprites, loadingImages);
      }
    };
    loadSpriteDetails();
  }, [
    member,
    base64Url,
    JSON.stringify(overrideAvatarGear),
    staticData.imagesMeta,
    staticData.avatarManifestItems
  ]);
  useEffect2(() => {
    if (loadingImages.total > 0 && loadingImages.loaded === loadingImages.total && loadingAvatar) {
      setLoadingAvatar(false);
      onLoadingEnd?.();
    }
  }, [loadingImages, loadingAvatar]);
  const showAvatar = useMemo2(() => !(showVisualBuffs && isDefined(avatarSpritesDetails?.buff?.backgroundUrl)), [showVisualBuffs, avatarSpritesDetails]);
  const showBackground = useMemo2(() => !avatarOnly || withBackground, [avatarOnly, withBackground]);
  const hideGear = useCallback((gearType) => {
    if (!showWeapon) return true;
    if (gearType === "weapon") {
      const costumeClass = member.preferences.costume ? "costume" : "equipped";
      const equippedWeapon = member.items.gear[costumeClass][gearType];
      if (!equippedWeapon) return false;
      const equippedIsTwoHanded = flatGear[equippedWeapon]?.twoHanded;
      const hasOverrideShield = overrideAvatarGear.shield;
      return equippedIsTwoHanded && hasOverrideShield;
    } else if (gearType === "shield") {
      const overrideWeapon = overrideAvatarGear.weapon;
      const overrideIsTwoHanded = overrideWeapon && flatGear[overrideWeapon]?.twoHanded;
      return overrideIsTwoHanded;
    }
    return false;
  }, [
    showWeapon,
    member.items.gear,
    flatGear,
    overrideAvatarGear.shield,
    overrideAvatarGear.weapon
  ]);
  const paddingTop = useMemo2(() => {
    if (overrideTopPadding) return overrideTopPadding;
    let val = "24px";
    if (!avatarOnly) {
      if (member.items.currentPet) val = "24px";
      if (member.items.currentMount) val = "0px";
    }
    return val;
  }, [overrideTopPadding, avatarOnly, member.items.currentMount, member.items.currentPet]);
  const topLevelClassList = useMemo2(() => {
    const classes = [];
    if (debugMode) classes.push("debug");
    if (centerAvatar) classes.push("centered-avatar");
    return createClassName(...classes);
  }, [debugMode, centerAvatar]);
  const specialMountClass = useMemo2(() => {
    if (!avatarOnly && member.items.currentMount && member.items.currentMount.includes("Kangaroo")) {
      return "offset-kangaroo";
    }
    return "";
  }, [avatarOnly, member]);
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(member);
  };
  if (!member.preferences) return null;
  if (!isDefined(avatarSpritesDetails)) return null;
  return /* @__PURE__ */ jsxs(
    HabiticaSprite_default,
    {
      className: createClassName("avatar", topLevelClassList),
      spriteDetails: showBackground ? avatarSpritesDetails.background : null,
      style: { width, height, paddingTop },
      onClick: handleClick,
      wrapper: "div",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "character-sprites", style: { margin: spritesMargin }, children: [
          !avatarOnly && member.items.currentMount && /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["mount.body"] }),
          avatarSpritesDetails.buff && showVisualBuffs ? /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.buff }) : null,
          /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["hair.flower"] }),
          showAvatar && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.chair, className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.back"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.skin, className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.shirt, className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.head_0, className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.armor"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.back_collar"], className: specialMountClass }),
            ["bangs", "base", "mustache", "beard"].map((type) => /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails[`hair.${type}`], className: specialMountClass }, type)),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.body"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.eyewear"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.head"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.headAccessory"], className: specialMountClass }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["hair.flower"], className: specialMountClass }),
            !hideGear("shield") && /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.shield"], className: specialMountClass }),
            !hideGear("weapon") && /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["gear.weapon"], className: createClassName(specialMountClass, "weapon") })
          ] }),
          member.preferences.sleep && /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails["sleep"] }),
          !avatarOnly && /* @__PURE__ */ jsxs(Fragment, { children: [
            member.items.currentMount && /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails[`mount.head`] }),
            /* @__PURE__ */ jsx3(HabiticaSprite_default, { spriteDetails: avatarSpritesDetails.pet, className: "current-pet" })
          ] })
        ] }),
        isDefined(member.stats.class) && showClassBadge && /* @__PURE__ */ jsx3(ClassBadge_default, { className: "under-avatar", memberClass: member.stats.class })
      ]
    }
  );
};
var HabiticaAvatar_default = HabiticaAvatar;
export {
  HabiticaAvatar_default as HabiticaAvatar
};
