// Module 1: Customer Inquiry (Sections A-H)

function renderInquiryList() {
  const inquiries = AppData.orders.filter(o => o.status === 'inquiry');
  return `
    ${HeaderBar('📋 पूछताछ', { subtitle: 'Customer Inquiries', actions: ActionButton('+ नई पूछताछ', "navigateTo('new-inquiry')", { type: 'success', small: true }) })}
    ${inquiries.length > 0 ? inquiries.map(o => OrderCard(o)).join('') :
      EmptyState('कोई active inquiry नहीं', { icon: '📋', action: ActionButton('+ नई पूछताछ शुरू करो', "navigateTo('new-inquiry')", { type: 'primary' }) })}
    <div style="height: 80px;"></div>
  `;
}

function renderNewInquiry() {
  const step = AppState.inquiryState.step || 1;
  const steps = [
    { num: 1, label: 'Customer पहचान' },
    { num: 2, label: 'Product' },
    { num: 3, label: 'Price & Upsell' },
    { num: 4, label: 'Delivery' },
    { num: 5, label: 'Supplier' },
    { num: 6, label: 'Call Summary' },
    { num: 7, label: 'Payment' },
    { num: 8, label: 'Deal Outcome' }
  ];

  return `
    ${HeaderBar('नई पूछताछ', { subtitle: `Step ${step} of 8`, backRoute: 'inquiries' })}
    <div style="padding:0 16px; overflow-x:auto; display:flex; gap:4px; background:var(--white); border-bottom:1px solid var(--gray-200);">
      ${steps.map(s => `
        <div style="flex-shrink:0; padding:8px 6px; text-align:center; font-size:10px;
          ${s.num === step ? 'color:var(--primary); font-weight:700; border-bottom:2px solid var(--primary);' : 'color:var(--gray-400);'}">
          ${s.num <= step ? '✓' : s.num} ${s.label}
        </div>
      `).join('')}
    </div>
    <div id="wizard-content">
      ${renderInquiryStep(step)}
    </div>
  `;
}

function renderInquiryStep(step) {
  switch (step) {
    case 1: return renderStepCustomer();
    case 2: return renderStepProduct();
    case 3: return renderStepPriceUpsell();
    case 4: return renderStepDelivery();
    case 5: return renderStepSupplier();
    case 6: return renderStepCallSummary();
    case 7: return renderStepPayment();
    case 8: return renderStepDealOutcome();
    default: return '';
  }
}

// Section A - Customer Identification
function renderStepCustomer() {
  const found = AppState.inquiryState.customer || null;
  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">A</span> Customer पहचान</div>
      ${FormTextInput('Phone Number', 'cust-phone', { placeholder: '9876543210', type: 'tel' })}
      ${ActionButton('🔍 खोजें', 'searchCustomer()', { type: 'primary' })}

      <div id="customer-result">
        ${found ? `
          <div style="margin-top:16px;">
            ${Card(`
              ${CustomerHeader(found)}
              ${found.last_order ? `
                <div class="info-row"><span class="info-label">Last Order</span><span class="info-value">${found.last_order.product}, ${formatDate(found.last_order.date)}, ${formatCurrency(found.last_order.amount)}</span></div>
              ` : '<div style="font-size:13px; color:var(--gray-400);">पहली बार आया है</div>'}
              <div class="info-row"><span class="info-label">Avg. Payment</span><span class="info-value">${found.average_days_to_pay} दिन</span></div>
            `)}
          </div>
        ` : ''}
      </div>

      ${!found ? `
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--gray-200);">
          <p style="font-size:13px; color:var(--gray-500); margin-bottom:12px;">नया Customer?</p>
          ${FormTextInput('Name', 'cust-name', { placeholder: 'Customer का नाम' })}
          ${FormDropdown('Type', 'cust-type', [
            { value: 'walk_in', label: 'Walk-in' },
            { value: 'regular', label: 'Regular' },
            { value: 'contractor', label: 'Contractor' },
            { value: 'builder', label: 'Builder' }
          ])}
        </div>
      ` : ''}
    </div>
    <div class="wizard-nav">
      ${ActionButton('आगे →', 'goToStep(2)', { type: 'primary' })}
    </div>
  `;
}

function searchCustomer() {
  const phone = document.getElementById('cust-phone')?.value;
  if (!phone) { showToast('Phone number डालें'); return; }
  const customer = getCustomerByPhone(phone);
  if (customer) {
    AppState.inquiryState.customer = customer;
    showToast(`✅ ${customer.name} मिल गया`);
  } else {
    AppState.inquiryState.customer = null;
    showToast('नया customer — details भरें');
  }
  handleRoute();
}

// Section B - Product Request
function renderStepProduct() {
  const selectedProducts = AppState.inquiryState.products || [];
  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">B</span> Product Request</div>

      ${FormDropdown('Product चुनें', 'prod-select', AppData.products.filter(p => p.is_active).map(p => ({ value: p.product_id, label: `${p.nameHi} (${p.name})` })))}
      ${FormNumberInput('Quantity', 'prod-qty', { placeholder: 'कितना चाहिए?' })}
      ${FormDropdown('Urgency', 'prod-urgency', [
        { value: 'immediate', label: 'अभी (Immediate)' },
        { value: 'today', label: 'आज (Today)' },
        { value: 'tomorrow', label: 'कल (Tomorrow)' },
        { value: 'flexible', label: 'कभी भी (Flexible)' }
      ])}

      ${ActionButton('+ Product जोड़ो', 'addProduct()', { type: 'success' })}

      ${selectedProducts.length > 0 ? `
        <div style="margin-top:16px;">
          <strong>Selected Products:</strong>
          ${selectedProducts.map((sp, i) => {
            const prod = getProduct(sp.product_id);
            return Card(`
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong>${prod?.nameHi || sp.product_id}</strong>
                  <div style="font-size:12px; color:var(--gray-500);">${sp.quantity} ${prod?.unit || ''} | ${sp.urgency}</div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeProduct(${i})">✕</button>
              </div>
              <!-- Price Guidance -->
              ${prod ? `
                <div class="price-guidance">
                  <div class="price-row"><span>Floor Price (minimum)</span><span>${formatCurrency(prod.floor_price)}/${prod.unit}</span></div>
                  <div class="price-row"><span>Market Price</span><span>${formatCurrency(prod.typical_market_price)}/${prod.unit}</span></div>
                  <div class="price-row"><span>Competition</span><span>${formatCurrency(prod.competitive_benchmark_price)}/${prod.unit}</span></div>
                  <div class="price-row"><span>Suggested Quote</span><span class="price-suggested">${formatCurrency(prod.typical_market_price)}/${prod.unit}</span></div>
                </div>
              ` : ''}
              ${prod?.type === 'inventory_held' ? `
                <div style="margin-top:8px; padding:8px; background:${AppData.inventory[0].current_stock >= sp.quantity ? 'var(--green-light)' : 'var(--red-light)'}; border-radius:6px; font-size:13px;">
                  📦 Stock: ${AppData.inventory[0].current_stock} bags ${AppData.inventory[0].current_stock >= sp.quantity ? '✅ पर्याप्त' : '⚠️ कम है'}
                  ${AppData.inventory[0].incoming ? `<br>Incoming: ${AppData.inventory[0].incoming} bags (${formatDate(AppData.inventory[0].incoming_expected)})` : ''}
                </div>
              ` : `
                <div style="margin-top:8px; padding:8px; background:var(--primary-light); border-radius:6px; font-size:13px;">
                  ⏱️ Lead time: ~${getSupplierForProduct(sp.product_id)?.typical_delivery_minutes || '?'} min
                </div>
              `}
            `);
          }).join('')}
        </div>
      ` : ''}
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(1)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(3)', { type: 'primary' })}
    </div>
  `;
}

function getSupplierForProduct(productId) {
  return AppData.suppliers.find(s => s.products_supplied.includes(productId));
}

function addProduct() {
  const pid = document.getElementById('prod-select')?.value;
  const qty = parseInt(document.getElementById('prod-qty')?.value) || 0;
  const urgency = document.getElementById('prod-urgency')?.value || 'today';
  if (!pid || qty <= 0) { showToast('Product और quantity select करें'); return; }
  if (!AppState.inquiryState.products) AppState.inquiryState.products = [];
  AppState.inquiryState.products.push({ product_id: pid, quantity: qty, urgency });
  showToast('✅ Product added');
  handleRoute();
}

function removeProduct(idx) {
  AppState.inquiryState.products.splice(idx, 1);
  handleRoute();
}

// Section C - Price Guidance & Upsell
function renderStepPriceUpsell() {
  const products = AppState.inquiryState.products || [];
  if (products.length === 0) return `<div class="wizard-step"><p>पहले product add करो</p></div><div class="wizard-nav">${ActionButton('← पीछे', 'goToStep(2)', { type: 'secondary' })}</div>`;

  // Get upsell suggestions based on selected products
  const selectedIds = products.map(p => p.product_id);
  const upsellProducts = [];
  products.forEach(sp => {
    const prod = getProduct(sp.product_id);
    if (prod?.related_products) {
      prod.related_products.forEach(rp => {
        if (!selectedIds.includes(rp) && !upsellProducts.find(u => u.product_id === rp)) {
          const rel = getProduct(rp);
          if (rel) upsellProducts.push(rel);
        }
      });
    }
  });

  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">C</span> Price & Upsell</div>

      ${upsellProducts.length > 0 ? `
        <div class="upsell-panel">
          <div class="upsell-title">भाई, यह भी ज़रूर चाहिए होगा:</div>
          ${upsellProducts.map(up => `
            <div class="upsell-item">
              <span>${up.nameHi} — कहाँ से ले रहे हो?</span>
              <div class="upsell-buttons">
                <button class="upsell-btn" onclick="addUpsellProduct('${up.product_id}'); this.classList.add('selected-yes');">✅ हमारे पास</button>
                <button class="upsell-btn" onclick="this.classList.add('selected-no');">❌ नहीं</button>
                <button class="upsell-btn" onclick="showCompetitorCapture('${up.product_id}'); this.classList.add('selected-competitor');">🏪 कहीं और</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `<p style="color:var(--gray-500);">No upsell suggestions</p>`}

      <div id="competitor-capture"></div>
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(2)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(4)', { type: 'primary' })}
    </div>
  `;
}

function addUpsellProduct(productId) {
  if (!AppState.inquiryState.products) AppState.inquiryState.products = [];
  if (AppState.inquiryState.products.find(p => p.product_id === productId)) return;
  showModal('Quantity डालो', `
    ${FormNumberInput('Quantity', 'upsell-qty', { placeholder: '?' })}
    <div class="modal-actions">
      ${ActionButton('Add', `
        const qty = parseInt(document.getElementById('upsell-qty').value) || 1;
        AppState.inquiryState.products.push({product_id: '${productId}', quantity: qty, urgency: 'today'});
        closeModal();
        showToast('✅ Product added');
        handleRoute();
      `, { type: 'primary' })}
    </div>
  `);
}

function showCompetitorCapture(productId) {
  const prod = getProduct(productId);
  const container = document.getElementById('competitor-capture');
  if (!container) return;
  container.innerHTML = `
    <div class="competitor-panel">
      <strong>🏪 Competitor Info — ${prod?.nameHi}</strong>
      ${FormTextInput('Competitor Name/Area', 'comp-name', { placeholder: 'दुकान का नाम' })}
      ${FormNumberInput('उनकी Price', 'comp-price', { unit: '₹/' + (prod?.unit || 'unit') })}
      ${ActionButton('Check', `checkCompetitorPrice('${productId}')`, { type: 'primary', small: true })}
      <div id="comp-result"></div>
    </div>
  `;
}

function checkCompetitorPrice(productId) {
  const prod = getProduct(productId);
  const compPrice = parseInt(document.getElementById('comp-price')?.value) || 0;
  if (!compPrice || !prod) return;
  const canMatch = compPrice >= prod.floor_price;
  const margin = compPrice - prod.floor_price;
  const counterOffer = Math.round(compPrice * 0.98);

  document.getElementById('comp-result').innerHTML = `
    <div class="competitor-result">
      <div class="info-row"><span class="info-label">Match कर सकते हैं?</span><span class="info-value ${canMatch ? 'text-green' : 'text-red'}">${canMatch ? '✅ हाँ' : '❌ नहीं'}</span></div>
      ${canMatch ? `
        <div class="info-row"><span class="info-label">Margin</span><span class="info-value">${formatCurrency(margin)}/${prod.unit}</span></div>
        <div class="info-row"><span class="info-label">Counter-offer</span><span class="info-value price-suggested">${formatCurrency(counterOffer)}/${prod.unit}</span></div>
        <div style="font-size:12px; color:var(--gray-500); margin-top:6px;">2% below competitor, still ${formatCurrency(counterOffer - prod.floor_price)} margin</div>
      ` : `<div style="font-size:12px; color:var(--red);">Floor price: ${formatCurrency(prod.floor_price)}. Escalate to owner.</div>`}
    </div>
  `;
}

// Section D - Delivery Requirements
function renderStepDelivery() {
  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">D</span> Delivery Details</div>
      ${FormTextInput('Delivery Address', 'del-address', { placeholder: 'Site का पता...' })}
      ${FormTextInput('Delivery Date', 'del-date', { type: 'date', value: '2026-02-20' })}
      ${FormTextInput('Delivery Time', 'del-time', { type: 'time', value: '14:00' })}
      ${FormDropdown('Delivery Type', 'del-type', [
        { value: 'deliver', label: 'Site पर deliver करो' },
        { value: 'pickup', label: 'Customer खुद लेगा' }
      ])}
      ${FormTextarea('Special Instructions', 'del-notes', { placeholder: 'Gate code, contact person, etc.', rows: 2 })}

      <div id="feasibility-check" style="margin-top:12px;">
        <div style="background: var(--yellow-light); padding:10px; border-radius:8px; font-size:13px;">
          ⚠️ Lead time check: Suppliers typically deliver in 60-120 minutes. Confirm availability before committing time.
        </div>
      </div>
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(3)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(5)', { type: 'primary' })}
    </div>
  `;
}

// Section E - Supplier Recommendation
function renderStepSupplier() {
  const products = AppState.inquiryState.products || [];
  const supplierProducts = products.filter(p => getProduct(p.product_id)?.type === 'supplier_procured');

  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">E</span> Supplier Recommendation</div>

      ${supplierProducts.length > 0 ? supplierProducts.map(sp => {
        const prod = getProduct(sp.product_id);
        const matchingSuppliers = AppData.suppliers
          .filter(s => s.products_supplied.includes(sp.product_id) && s.is_active)
          .sort((a, b) => b.reliability_score - a.reliability_score);

        return `
          <div style="margin-bottom:20px;">
            <strong>${prod?.nameHi} — ${sp.quantity} ${prod?.unit}</strong>
            <table class="supplier-rank-table">
              <tr><th>#</th><th>Supplier</th><th>Reliability</th><th>Price</th><th>Action</th></tr>
              ${matchingSuppliers.map((s, i) => {
                const price = s.typical_price[sp.product_id];
                const relColor = s.reliability_score >= 80 ? 'green' : s.reliability_score >= 60 ? 'yellow' : 'red';
                return `<tr>
                  <td>${i + 1}</td>
                  <td><strong>${s.name}</strong><br><span style="font-size:10px;color:var(--gray-400)">${s.area}</span></td>
                  <td><span class="badge badge-${relColor}">${s.reliability_score}%</span></td>
                  <td>${price ? formatCurrency(price) : '-'}</td>
                  <td>${CallButton(s.phone, s.name, { small: true })}</td>
                </tr>`;
              }).join('')}
            </table>
            ${matchingSuppliers.length > 0 ? `
              <div style="background:var(--primary-light); padding:8px; border-radius:6px; font-size:12px; margin-top:6px;">
                💡 ${matchingSuppliers[0].name} is recommended (${matchingSuppliers[0].reliability_score}% on time, ~${matchingSuppliers[0].typical_delivery_minutes} min delivery)
              </div>
            ` : ''}
          </div>
        `;
      }).join('') : '<p style="color:var(--gray-500);">All products from inventory — no supplier needed</p>'}
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(4)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(6)', { type: 'primary' })}
    </div>
  `;
}

// Section F - Call Summary (simulated)
function renderStepCallSummary() {
  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">F</span> Supplier Call Summary</div>

      <p style="font-size:13px; color:var(--gray-500); margin-bottom:12px;">Supplier को call करने के बाद, summary यहाँ आएगी:</p>

      ${ActionButton('📞 Simulate Supplier Call', 'simulateCall()', { type: 'call' })}

      <div id="call-summary-result"></div>
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(5)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(7)', { type: 'primary' })}
    </div>
  `;
}

function simulateCall() {
  const resultDiv = document.getElementById('call-summary-result');
  if (!resultDiv) return;

  resultDiv.innerHTML = `
    <div class="loading" style="margin-top:20px;">
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
      <p style="margin-top:8px;">Processing call... (2-3 min)</p>
    </div>
  `;

  setTimeout(() => {
    resultDiv.innerHTML = `
      <div style="margin-top:16px;">
        ${WhatsAppBubble(`📞 <strong>Call Summary — Sharma Traders</strong>
Spoke with: Ramesh Sharma

<strong>Key details:</strong>
• Sand: ₹3,400 per brass
• Delivery: 90 minutes
• Condition: Payment on delivery

Order action needed: Yes`, { type: 'received', time: '11:35 AM' })}

        <div class="wa-actions" style="justify-content:center; margin-top:12px;">
          <button class="wa-action-btn" onclick="showToast('✅ Call summary confirmed'); this.style.background='var(--green-light)';">✅ Sahi hai</button>
          <button class="wa-action-btn" onclick="showToast('✏️ Edit mode — type corrections')">✏️ Edit</button>
          <button class="wa-action-btn" onclick="showToast('❌ Rejected')">❌ Galat hai</button>
        </div>
      </div>
    `;
  }, 3000);
}

// Section G - Payment Terms
function renderStepPayment() {
  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">G</span> Payment Terms</div>

      ${FormDropdown('Payment Type', 'pay-type', [
        { value: 'cod', label: 'Cash on Delivery' },
        { value: 'partial_advance', label: 'Partial Advance' },
        { value: 'credit', label: 'Credit (उधार)' },
        { value: 'upi_on_delivery', label: 'UPI on Delivery' }
      ], { onChange: 'onPaymentTypeChange()' })}

      <div id="payment-extra"></div>

      ${FormDropdown('Collection Method', 'pay-collection', [
        { value: 'shop', label: 'Customer दुकान पर आएगा' },
        { value: 'site', label: 'हम site पर collect करेंगे' },
        { value: 'upi', label: 'UPI Transfer' }
      ])}
    </div>
    <div class="wizard-nav">
      ${ActionButton('← पीछे', 'goToStep(6)', { type: 'secondary' })}
      ${ActionButton('आगे →', 'goToStep(8)', { type: 'primary' })}
    </div>
  `;
}

function onPaymentTypeChange() {
  const type = document.getElementById('pay-type')?.value;
  const extra = document.getElementById('payment-extra');
  if (!extra) return;

  if (type === 'partial_advance') {
    extra.innerHTML = `
      ${FormNumberInput('Advance Amount', 'pay-advance', { unit: '₹', placeholder: 'कितना advance?' })}
      ${FormTextInput('Balance Due Date', 'pay-balance-date', { type: 'date' })}
    `;
  } else if (type === 'credit') {
    extra.innerHTML = `
      ${FormNumberInput('Credit Days', 'pay-credit-days', { unit: 'दिन', placeholder: 'कितने दिन?' })}
    `;
  } else {
    extra.innerHTML = '';
  }
}

// Section H - Deal Outcome
function renderStepDealOutcome() {
  const products = AppState.inquiryState.products || [];
  const totalAmount = products.reduce((s, p) => {
    const prod = getProduct(p.product_id);
    return s + (prod ? prod.typical_market_price * p.quantity : 0);
  }, 0);

  return `
    <div class="wizard-step">
      <div class="wizard-step-title"><span class="step-num">H</span> Deal Outcome</div>

      <div style="text-align:center; margin:20px 0;">
        <div style="font-size:14px; color:var(--gray-500);">Total Order Value</div>
        <div style="font-size:32px; font-weight:700; color:var(--primary);">${formatCurrency(totalAmount)}</div>
        <div style="font-size:12px; color:var(--gray-400);">${products.map(p => getProduct(p.product_id)?.nameHi).join(' + ')}</div>
      </div>

      <button class="deal-btn confirm" onclick="confirmDeal(${totalAmount})">
        ✅ Order Confirm Karo
      </button>

      <button class="deal-btn lost" onclick="showLostDealForm()">
        ❌ Deal Nahi Hua
      </button>

      <div id="lost-deal-form"></div>
    </div>
  `;
}

function confirmDeal(amount) {
  showToast('✅ Order confirmed! Active Orders में दिखेगा');
  AppState.inquiryState = {};
  setTimeout(() => navigateTo('orders'), 1000);
}

function showLostDealForm() {
  document.getElementById('lost-deal-form').innerHTML = `
    <div style="margin-top:16px; padding:16px; background:var(--red-light); border-radius:var(--radius-sm);">
      <strong style="color:var(--red-dark);">Reason:</strong>
      ${FormDropdown('', 'lost-reason', [
        { value: 'price', label: 'Price too high' },
        { value: 'delivery', label: 'Delivery too slow' },
        { value: 'competitor', label: 'Competitor offered better' },
        { value: 'just_enquiring', label: 'Just enquiring' },
        { value: 'other', label: 'Other' }
      ])}
      ${FormTextarea('Notes (optional)', 'lost-notes', { rows: 2 })}
      ${ActionButton('Save Lost Deal', "showToast('📝 Lost deal saved'); AppState.inquiryState = {}; setTimeout(() => navigateTo('inquiries'), 1000)", { type: 'danger' })}
    </div>
  `;
}

function goToStep(step) {
  AppState.inquiryState.step = step;
  handleRoute();
}
