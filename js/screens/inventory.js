// Module 4: Inventory Management

function renderInventory() {
  const inv = AppData.inventory[0];
  const netAvailable = inv.current_stock + (inv.incoming || 0) - (inv.committed || 0);
  const stockColor = inv.current_stock > inv.reorder_threshold * 2 ? 'text-green' :
    inv.current_stock > inv.reorder_threshold ? 'text-yellow' : 'text-red';

  return `
    ${HeaderBar('📦 Inventory', { subtitle: 'Cement Stock', backRoute: AppState.role === 'nephew' ? 'more' : '' })}

    <!-- Cement Stock Widget -->
    ${Card(`
      <div class="stock-display">
        <div class="stock-number ${stockColor}">${inv.current_stock}</div>
        <div class="stock-unit">${inv.unit}</div>
        <div style="font-size:13px; color:var(--gray-500); margin-top:8px;">${inv.product_name}</div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center; margin-top:12px;">
        <div>
          <div style="font-size:18px; font-weight:700; color:var(--green-dark);">+${inv.incoming || 0}</div>
          <div style="font-size:11px; color:var(--gray-500);">Incoming</div>
        </div>
        <div>
          <div style="font-size:18px; font-weight:700; color:var(--red-dark);">-${inv.committed || 0}</div>
          <div style="font-size:11px; color:var(--gray-500);">Committed</div>
        </div>
        <div>
          <div style="font-size:18px; font-weight:700; color:var(--primary);">${netAvailable}</div>
          <div style="font-size:11px; color:var(--gray-500);">Net Available</div>
        </div>
      </div>
      ${inv.incoming ? `<div style="font-size:12px; color:var(--gray-400); text-align:center; margin-top:8px;">
        Incoming: ${inv.incoming} bags expected ${formatDate(inv.incoming_expected)}
      </div>` : ''}
    `)}

    <!-- Stock Adjustment -->
    ${SectionTitle('✏️ Stock Adjustment')}
    ${Card(`
      <div class="stock-adjust">
        <button class="stock-btn" onclick="adjustStock(-1)">−</button>
        <span style="font-size:20px; font-weight:700;" id="adj-amount">0</span>
        <button class="stock-btn" onclick="adjustStock(1)">+</button>
      </div>
      <div style="margin-top:16px;">
        ${FormDropdown('Reason', 'adj-reason', [
          { value: 'received', label: '📥 Stock received' },
          { value: 'sold', label: '📤 Sold' },
          { value: 'damaged', label: '💔 Damaged' },
          { value: 'count_correction', label: '🔢 Count correction' }
        ])}
        ${FormTextarea('Notes', 'adj-notes', { placeholder: 'Details...', rows: 2 })}
        ${ActionButton('✅ Save Adjustment', 'saveAdjustment()', { type: 'primary' })}
      </div>
    `)}

    ${inv.current_stock <= inv.reorder_threshold ? `
      <div class="dispatch-banner" style="background:var(--yellow);">
        ⚠️ Stock low! Reorder threshold: ${inv.reorder_threshold} bags
        <div style="margin-top:8px;">
          ${ActionButton('📞 Call Supplier', "showToast('📞 Calling Gupta Cement Depot...')", { type: 'primary', small: true })}
        </div>
      </div>
    ` : ''}

    <!-- Inventory History -->
    ${SectionTitle('📜 History')}
    ${AppData.inventoryLog.map(log => `
      <div class="list-item">
        <div style="flex:1;">
          <div style="font-weight:600; font-size:14px;">
            <span style="color:${log.change_amount > 0 ? 'var(--green-dark)' : 'var(--red-dark)'};">
              ${log.change_amount > 0 ? '+' : ''}${log.change_amount}
            </span>
            bags — ${log.reason}
          </div>
          <div style="font-size:12px; color:var(--gray-500);">
            ${log.notes} | ${formatDate(log.recorded_at)} ${formatTime(log.recorded_at)} | ${log.recorded_by}
          </div>
        </div>
      </div>
    `).join('')}
    <div style="height:80px;"></div>
  `;
}

let adjAmount = 0;

function adjustStock(delta) {
  adjAmount += delta;
  const el = document.getElementById('adj-amount');
  if (el) el.textContent = adjAmount;
}

function saveAdjustment() {
  if (adjAmount === 0) { showToast('Quantity change करो'); return; }
  const reason = document.getElementById('adj-reason')?.value;
  if (!reason) { showToast('Reason select करो'); return; }

  AppData.inventory[0].current_stock += adjAmount;
  AppData.inventoryLog.unshift({
    log_id: 'IL' + Date.now(),
    product_id: 'P001',
    change_amount: adjAmount,
    reason: reason,
    order_id: null,
    recorded_by: AppState.role,
    recorded_at: new Date().toISOString(),
    notes: document.getElementById('adj-notes')?.value || ''
  });

  showToast(`✅ Stock updated: ${adjAmount > 0 ? '+' : ''}${adjAmount} bags`);
  adjAmount = 0;
  handleRoute();
}
