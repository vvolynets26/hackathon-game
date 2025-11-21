/**
 * Shop Component
 * 
 * Displays the shop screen where players can browse and purchase items using «Світлячки».
 * Features:
 * - Full-screen overlay (modal-style)
 * - Grid/list of shop items with cards
 * - Right panel showing selected item details
 * - Purchase and equip functionality
 * - Ukrainian text throughout
 * 
 * @example
 * ```tsx
 * {showShop && <Shop onClose={handleCloseShop} />}
 * ```
 */

import { useState } from 'react';
import { useProgression } from '../../contexts/ProgressionContext';
import {
  SHOP_ITEMS,
  isItemPurchased,
  isItemEquipped,
  getItemState,
  canAffordItem,
} from '../../utils/constants';
import { TRANSLATIONS } from '../../utils/translations';
import styles from './Shop.module.css';

/**
 * Shop component props.
 */
interface ShopProps {
  /** Callback when shop is closed */
  onClose: () => void;
}

/**
 * Shop component.
 * 
 * Displays shop screen with items, purchase, and equip functionality.
 * Reads from ProgressionContext for currency and item states.
 * 
 * @param props - Component props
 * @param props.onClose - Callback to close shop
 * @returns React element representing the shop screen
 */
export function Shop({ onClose }: ShopProps) {
  const { progressionState, purchaseItem, equipItem } = useProgression();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Get selected item details
  const selectedItem = selectedItemId
    ? SHOP_ITEMS.find((item) => item.id === selectedItemId)
    : null;

  // Handle item card click
  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  // Handle purchase button click
  const handlePurchase = () => {
    if (!selectedItem) return;

    const result = purchaseItem(selectedItem.id);
    if (result.success) {
      // Purchase successful - UI will update automatically via ProgressionContext
      // Currency counter animation handled by CSS transition
    } else {
      // Handle purchase error (already handled by ProgressionContext validation)
      if (import.meta.env.DEV) {
        console.warn(`Purchase failed: ${result.error}`);
      }
    }
  };

  // Handle equip button click
  const handleEquip = () => {
    if (!selectedItem) return;

    // Determine item slot based on item ID
    let slot: 'characterSkin' | 'cat' | 'candle' = 'characterSkin';
    if (selectedItem.id.startsWith('cat-')) {
      slot = 'cat';
    } else if (selectedItem.id.startsWith('candle-')) {
      slot = 'candle';
    } else if (selectedItem.id.startsWith('skin-')) {
      slot = 'characterSkin';
    }

    const result = equipItem(slot, selectedItem.id);
    if (result.success) {
      // Equip successful - UI will update automatically via ProgressionContext
    } else {
      // Handle equip error (already handled by ProgressionContext validation)
      if (import.meta.env.DEV) {
        console.warn(`Equip failed: ${result.error}`);
      }
    }
  };

  // Get item state for display
  const getItemStateDisplay = (itemId: string): string => {
    const state = getItemState(itemId, progressionState);
    if (state === 'equipped') {
      return TRANSLATIONS.shop.itemState.equipped;
    }
    if (state === 'purchased') {
      return TRANSLATIONS.shop.itemState.purchased;
    }
    return TRANSLATIONS.shop.itemState.locked;
  };

  // Get action button text and state
  const getActionButton = () => {
    if (!selectedItem) return null;

    const state = getItemState(selectedItem.id, progressionState);
    const canAfford = canAffordItem(selectedItem.id, progressionState.svitlyachky);
    const isPurchased = isItemPurchased(selectedItem.id, progressionState.purchasedItems);
    const isEquipped = isItemEquipped(selectedItem.id, progressionState.equippedItems);

    // Gameplay buffs don't need equipping
    if (selectedItem.type === 'buff') {
      if (isPurchased) {
        return {
          text: TRANSLATIONS.shop.actions.owned,
          disabled: true,
          onClick: () => {},
        };
      }
      if (canAfford) {
        return {
          text: TRANSLATIONS.shop.actions.purchase,
          disabled: false,
          onClick: handlePurchase,
        };
      }
      return {
        text: TRANSLATIONS.shop.actions.insufficientCurrency,
        disabled: true,
        onClick: () => {},
      };
    }

    // Cosmetic items
    if (isEquipped) {
      return {
        text: TRANSLATIONS.shop.actions.equipped,
        disabled: true,
        onClick: () => {},
      };
    }
    if (isPurchased) {
      return {
        text: TRANSLATIONS.shop.actions.equip,
        disabled: false,
        onClick: handleEquip,
      };
    }
    if (canAfford) {
      return {
        text: TRANSLATIONS.shop.actions.purchase,
        disabled: false,
        onClick: handlePurchase,
      };
    }
    return {
      text: TRANSLATIONS.shop.actions.insufficientCurrency,
      disabled: true,
      onClick: () => {},
    };
  };

  const actionButton = getActionButton();

  return (
    <div className={styles.overlay}>
      <div className={styles.shopCard}>
        {/* Top section: Title and currency */}
        <div className={styles.topSection}>
          <h1 className={styles.title}>{TRANSLATIONS.shop.title}</h1>
          <div className={styles.currencyDisplay}>
            ✨ {progressionState.svitlyachky}
          </div>
        </div>

        {/* Main content area */}
        <div className={styles.mainContent}>
          {/* Left: Shop items grid */}
          <div className={styles.itemsGrid}>
            {SHOP_ITEMS.map((item) => {
              const state = getItemState(item.id, progressionState);
              const isSelected = selectedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`${styles.itemCard} ${isSelected ? styles.itemCardSelected : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {/* Item icon placeholder */}
                  <div className={styles.itemIcon}>
                    {item.type === 'cosmetic' ? '🎨' : '⚡'}
                  </div>
                  
                  {/* Item name */}
                  <div className={styles.itemName}>{item.name}</div>
                  
                  {/* Item price */}
                  <div className={styles.itemPrice}>
                    ✨ {item.price}
                  </div>
                  
                  {/* Item state */}
                  <div className={styles.itemState}>
                    {getItemStateDisplay(item.id)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected item details panel */}
          {selectedItem && (
            <div className={styles.detailsPanel}>
              {/* Big icon/preview */}
              <div className={styles.detailsIcon}>
                {selectedItem.type === 'cosmetic' ? '🎨' : '⚡'}
              </div>

              {/* Item name */}
              <h2 className={styles.detailsName}>{selectedItem.name}</h2>

              {/* Description */}
              <p className={styles.detailsDescription}>{selectedItem.description}</p>

              {/* Effect (if gameplay buff) */}
              {selectedItem.effect && (
                <p className={styles.detailsEffect}>{selectedItem.effect}</p>
              )}

              {/* Action button */}
              {actionButton && (
                <button
                  className={`${styles.actionButton} ${actionButton.disabled ? styles.actionButtonDisabled : ''}`}
                  onClick={actionButton.onClick}
                  disabled={actionButton.disabled}
                >
                  {actionButton.text}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom section: Back button */}
        <div className={styles.bottomSection}>
          <button className={styles.backButton} onClick={onClose}>
            {TRANSLATIONS.shop.back}
          </button>
        </div>
      </div>
    </div>
  );
}

