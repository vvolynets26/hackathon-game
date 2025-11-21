/**
 * Ukrainian Translations Constants
 * 
 * Centralized Ukrainian text constants for the game.
 * All gameplay text is stored here for consistency and easy maintenance.
 * 
 * Follows PRD requirements:
 * - FR40: All game text, UI elements, and content are displayed in Ukrainian language
 * - FR41: Key game terms remain in Ukrainian («Вечір при блекауті», «Світлячки», «Затишок»)
 * - FR42: The game maintains a light, cozy, humorous tone throughout all content
 * 
 * @example
 * ```tsx
 * import { TRANSLATIONS } from '../utils/translations';
 * 
 * <div>{TRANSLATIONS.gameplay.timer}</div>
 * ```
 */

/**
 * Ukrainian text translations organized by category.
 */
export const TRANSLATIONS = {
  /**
   * Core gameplay UI text
   */
  gameplay: {
    /** Timer label */
    timer: 'Час',
    /** Coziness meter label */
    coziness: 'Затишок',
    /** Event interaction hint */
    eventInteraction: 'Натисніть E, щоб взаємодіяти',
  },

  /**
   * Progression UI text
   */
  progression: {
    /** Level label */
    level: 'Рівень',
  },

  /**
   * Event type names in Ukrainian
   */
  eventTypes: {
    /** Phone event type name */
    phone: 'Телефон',
    /** Kettle event type name */
    kettle: 'Чайник',
    /** Cat event type name */
    cat: 'Кіт',
    /** Candle event type name */
    candle: 'Свічка',
  },

  /**
   * Event descriptions in Ukrainian
   */
  eventDescriptions: {
    /** Phone event description */
    phone: 'Телефон майже розрядився',
    /** Kettle event description */
    kettle: 'Чайник кипить',
    /** Cat event description */
    cat: 'Кіт нервує',
    /** Candle event description */
    candle: 'Свічка згасає',
  },

  /**
   * Win and lose messages
   */
  messages: {
    /** Win message when evening completes successfully */
    win: 'Ви пережили вечір при блекауті ✨',
    /** Alternative win message */
    winAlternative: 'Вечір завершено!',
    /** Lose message when coziness reaches zero */
    lose: 'Затишок закінчився',
  },

  /**
   * Shop screen text
   */
  shop: {
    /** Shop screen title */
    title: 'Магазин',
    /** Back button text */
    back: 'Назад',
    /** Item state labels */
    itemState: {
      /** Locked item state */
      locked: 'Заблоковано',
      /** Purchased item state */
      purchased: 'Куплено',
      /** Equipped item state */
      equipped: 'Використовується',
    },
    /** Action button labels */
    actions: {
      /** Purchase button */
      purchase: 'Купити',
      /** Equip button */
      equip: 'Обрати',
      /** Equipped state (non-clickable) */
      equipped: 'Використовується',
      /** Insufficient currency (disabled) */
      insufficientCurrency: 'Недостатньо світлячків',
      /** Owned state (for buffs) */
      owned: 'Придбано',
    },
  },

  /**
   * Menu screen text
   */
  menu: {
    /** Menu screen title */
    title: 'Вечір при блекауті',
    /** Play button text */
    play: 'Грати',
    /** Shop button text */
    shop: 'Магазин',
    /** Achievements button text */
    achievements: 'Досягнення',
  },
} as const;

/**
 * Type-safe access to translations
 */
export type Translations = typeof TRANSLATIONS;

