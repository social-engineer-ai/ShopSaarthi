// Module 3: Supplier Management

function renderSupplierList() {
  return `
    ${HeaderBar('🏭 Suppliers', { subtitle: `${AppData.suppliers.filter(s => s.is_active).length} active suppliers` })}
    ${AppData.suppliers.filter(s => s.is_active).map(s => {
      const relColor = s.reliability_score >= 80 ? 'green' : s.reliability_score >= 60 ? 'yellow' : 'red';
      return Card(`
        ${SupplierHeader(s)}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px;">
          <div class="info-row"><span class="info-label">Active Orders</span><span class="info-value">${s.active_orders_count}</span></div>
          <div class="info-row"><span class="info-label">In Transit</span><span class="info-value">${formatCurrency(s.total_in_transit)}</span></div>
          <div class="info-row"><span class="info-label">Outstanding</span><span class="info-value ${s.outstanding_payment > 0 ? 'text-red' : ''}">${formatCurrency(s.outstanding_payment)}</span></div>
          <div class="info-row"><span class="info-label">Terms</span><span class="info-value">${s.payment_terms}</span></div>
        </div>
        <div style="display:flex; gap:8px; margin-top:10px;">
          ${CallButton(s.phone, s.contact_name, { small: true })}
          ${ActionButton('Details →', `navigateTo('supplier-detail/${s.supplier_id}')`, { type: 'secondary', small: true })}
        </div>
      `, { onClick: `navigateTo('supplier-detail/${s.supplier_id}')` });
    }).join('')}
    <div style="height:80px;"></div>
  `;
}

function renderSupplierDetail(supplierId) {
  const supplier = getSupplier(supplierId);
  if (!supplier) return HeaderBar('Supplier Not Found') + EmptyState('Supplier नहीं मिला');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'calls', label: 'Call History' },
    { id: 'prices', label: 'Price History' },
    { id: 'orders', label: 'Order History' }
  ];

  const activeTab = AppState.supplierDetailTab || 'overview';
  const relColor = supplier.reliability_score >= 80 ? 'green' : supplier.reliability_score >= 60 ? 'yellow' : 'red';

  let tabContent = '';
  switch (activeTab) {
    case 'overview':
      tabContent = `
        ${Card(`
          <div class="info-row"><span class="info-label">Contact</span><span class="info-value">${supplier.contact_name}</span></div>
          <div class="info-row"><span class="info-label">Area</span><span class="info-value">${supplier.area}</span></div>
          <div class="info-row"><span class="info-label">Phone</span><span class="info-value"><a href="tel:${supplier.phone}">${supplier.phone}</a></span></div>
          <div class="info-row"><span class="info-label">Products</span><span class="info-value">${supplier.products_supplied.map(p => getProduct(p)?.nameHi || p).join(', ')}</span></div>
          <div class="info-row"><span class="info-label">Delivery Time</span><span class="info-value">~${supplier.typical_delivery_minutes} min</span></div>
          <div class="info-row"><span class="info-label">Payment Terms</span><span class="info-value">${supplier.payment_terms}</span></div>
          <div class="info-row"><span class="info-label">Reliability</span><span class="info-value"><span class="badge badge-${relColor}">${supplier.reliability_score}% on time</span></span></div>
          <div class="info-row"><span class="info-label">Outstanding</span><span class="info-value text-red">${formatCurrency(supplier.outstanding_payment)}</span></div>
        `)}
        ${supplier.notes ? Card(`<div style="font-size:13px; color:var(--gray-600);">📝 ${supplier.notes}</div>`) : ''}
      `;
      break;

    case 'calls':
      const callHistory = AppData.supplierCallHistory[supplierId] || [];
      tabContent = callHistory.length > 0 ? callHistory.map(c => `
        <div class="call-card">
          <div class="call-header">
            <span class="call-contact">${c.date}</span>
            <span class="call-time">${c.time} (${c.duration} min)</span>
          </div>
          <div class="call-summary">${c.summary}</div>
        </div>
      `).join('') : EmptyState('कोई call history नहीं', { icon: '📞' });
      break;

    case 'prices':
      const priceHistory = AppData.supplierPriceHistory[supplierId];
      if (priceHistory) {
        tabContent = Object.keys(priceHistory).map(pid => {
          const prod = getProduct(pid);
          const prices = priceHistory[pid];
          const maxPrice = Math.max(...prices.map(p => p.price));
          const minPrice = Math.min(...prices.map(p => p.price));
          const range = maxPrice - minPrice || 1;

          return Card(`
            <strong>${prod?.nameHi || pid} — Price Trend</strong>
            <div class="price-bars" style="margin-bottom:24px;">
              ${prices.map(p => {
                const height = Math.max(20, ((p.price - minPrice) / range) * 80);
                return `<div class="price-bar" style="height:${height}px;">
                  <div class="price-bar-value">₹${p.price}</div>
                  <div class="price-bar-label">${p.date.slice(5)}</div>
                </div>`;
              }).join('')}
            </div>
            <div style="font-size:12px; color:var(--gray-500); margin-top:8px;">
              Current: ${formatCurrency(prices[prices.length - 1].price)} | Range: ${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}
            </div>
          `);
        }).join('');
      } else {
        tabContent = EmptyState('Price history उपलब्ध नहीं', { icon: '📊' });
      }
      break;

    case 'orders':
      const orders = getOrdersForSupplier(supplierId);
      tabContent = orders.length > 0 ? orders.map(o => OrderCard(o)).join('') : EmptyState('कोई orders नहीं', { icon: '📦' });
      break;
  }

  return `
    ${HeaderBar(supplier.name, { subtitle: supplier.area, backRoute: 'suppliers', actions: CallButton(supplier.phone, supplier.contact_name, { small: true }) })}
    ${TabBar(tabs, activeTab, 'setSupplierDetailTab')}
    ${tabContent}
    <div style="height:80px;"></div>
  `;
}

function setSupplierDetailTab(tabId) {
  AppState.supplierDetailTab = tabId;
  handleRoute();
}
