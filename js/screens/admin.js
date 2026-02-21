// Admin Panel - 8 Tabs

function renderAdmin() {
  const tabs = [
    { id: 'pricing', label: 'Pricing' },
    { id: 'products', label: 'Products' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'workers', label: 'Workers' },
    { id: 'templates', label: 'Templates' },
    { id: 'escalation', label: 'Escalation' },
    { id: 'competitive', label: 'Intel' },
    { id: 'settings', label: 'Settings' }
  ];

  let content = '';
  switch (AppState.adminTab) {
    case 'pricing': content = renderAdminPricing(); break;
    case 'products': content = renderAdminProducts(); break;
    case 'suppliers': content = renderAdminSuppliers(); break;
    case 'workers': content = renderAdminWorkers(); break;
    case 'templates': content = renderAdminTemplates(); break;
    case 'escalation': content = renderAdminEscalation(); break;
    case 'competitive': content = renderAdminCompetitive(); break;
    case 'settings': content = renderAdminSettings(); break;
    default: content = renderAdminPricing();
  }

  return `
    ${HeaderBar('⚙️ Admin Panel', { subtitle: 'Configuration', actions: `<button class="btn btn-sm btn-secondary" onclick="switchRole()">🔄</button>` })}
    ${TabBar(tabs, AppState.adminTab, 'setAdminTab')}
    ${content}
    <div style="height:80px;"></div>
  `;
}

function setAdminTab(tabId) {
  AppState.adminTab = tabId;
  handleRoute();
}

function renderAdminPricing() {
  return `
    ${SectionTitle('💰 Pricing Configuration')}
    <div class="admin-table-scroll">
      <table class="admin-table">
        <tr><th>Product</th><th>Floor</th><th>Market</th><th>Competition</th><th>Unit</th></tr>
        ${AppData.products.map(p => `
          <tr>
            <td><strong>${p.nameHi}</strong><br><span style="font-size:11px;color:var(--gray-400)">${p.name}</span></td>
            <td><input type="number" value="${p.floor_price}" onchange="updatePrice('${p.product_id}','floor_price',this.value)"></td>
            <td><input type="number" value="${p.typical_market_price}" onchange="updatePrice('${p.product_id}','typical_market_price',this.value)"></td>
            <td><input type="number" value="${p.competitive_benchmark_price}" onchange="updatePrice('${p.product_id}','competitive_benchmark_price',this.value)"></td>
            <td>${p.unit}</td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div style="padding:16px;">
      ${ActionButton('💾 Save Changes', "showToast('✅ Prices updated')", { type: 'primary' })}
    </div>
  `;
}

function updatePrice(productId, field, value) {
  const product = getProduct(productId);
  if (product) product[field] = parseInt(value) || 0;
}

function renderAdminProducts() {
  return `
    ${SectionTitle('📦 Product Catalog')}
    <div class="admin-table-scroll">
      <table class="admin-table">
        <tr><th>Product</th><th>Unit</th><th>Type</th><th>Active</th></tr>
        ${AppData.products.map(p => `
          <tr>
            <td><strong>${p.nameHi}</strong><br>${p.name}</td>
            <td>${p.unit}</td>
            <td>${p.type === 'inventory_held' ? '📦 Inventory' : '🏭 Supplier'}</td>
            <td><div class="toggle-switch ${p.is_active ? 'active' : ''}" onclick="toggleProductActive('${p.product_id}')"></div></td>
          </tr>
        `).join('')}
      </table>
    </div>
    ${SectionTitle('🔗 Upsell Relationships')}
    ${Card(AppData.products.map(p => `
      <div style="padding:8px 0; border-bottom:1px solid var(--gray-100);">
        <strong>${p.nameHi}</strong> → ${p.related_products.map(rp => getProduct(rp)?.nameHi || rp).join(', ') || 'None'}
      </div>
    `).join(''))}
  `;
}

function toggleProductActive(pid) {
  const p = getProduct(pid);
  if (p) { p.is_active = !p.is_active; handleRoute(); }
}

function renderAdminSuppliers() {
  return `
    ${SectionTitle('🏭 Supplier Master')}
    ${AppData.suppliers.map(s => Card(`
      <div style="display:flex; justify-content:space-between; align-items:start;">
        <div>
          <strong>${s.name}</strong>
          <div style="font-size:12px; color:var(--gray-500);">${s.contact_name} | ${s.area}</div>
          <div style="font-size:12px; color:var(--gray-500);">📞 ${s.phone}</div>
        </div>
        <div class="toggle-switch ${s.is_active ? 'active' : ''}" onclick="toggleSupplierActive('${s.supplier_id}')"></div>
      </div>
      <div style="margin-top:8px; display:grid; grid-template-columns:1fr 1fr; gap:4px; font-size:12px;">
        <div>Products: ${s.products_supplied.map(p => getProduct(p)?.nameHi).join(', ')}</div>
        <div>Delivery: ~${s.typical_delivery_minutes} min</div>
        <div>Terms: ${s.payment_terms}</div>
        <div>Reliability: <span class="badge badge-${s.reliability_score >= 80 ? 'green' : s.reliability_score >= 60 ? 'yellow' : 'red'}">${s.reliability_score}%</span></div>
      </div>
    `)).join('')}
  `;
}

function toggleSupplierActive(sid) {
  const s = getSupplier(sid);
  if (s) { s.is_active = !s.is_active; handleRoute(); }
}

function renderAdminWorkers() {
  return `
    ${SectionTitle('👷 Worker Master')}
    <div class="admin-table-scroll">
      <table class="admin-table">
        <tr><th>Name</th><th>Phone</th><th>Type</th><th>Daily Wage</th><th>Active</th></tr>
        ${AppData.workers.map(w => `
          <tr>
            <td><strong>${w.name}</strong></td>
            <td>${w.phone}</td>
            <td>${w.type}</td>
            <td>${formatCurrency(w.daily_wage_rate)}</td>
            <td><div class="toggle-switch ${w.is_active ? 'active' : ''}" onclick="toggleWorkerActive('${w.worker_id}')"></div></td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div style="padding:16px;">
      ${ActionButton('+ Add Worker', "showToast('Coming soon')", { type: 'success' })}
    </div>
  `;
}

function toggleWorkerActive(wid) {
  const w = getWorker(wid);
  if (w) { w.is_active = !w.is_active; handleRoute(); }
}

function renderAdminTemplates() {
  return `
    ${SectionTitle('📝 Task Templates')}
    <div class="admin-table-scroll">
      <table class="admin-table">
        <tr><th>Task</th><th>Hindi</th><th>Default Time</th><th>Default Assignee</th><th>Active</th></tr>
        ${AppData.taskTemplates.map(tt => `
          <tr>
            <td>${tt.name}</td>
            <td>${tt.nameHi}</td>
            <td><input type="time" value="${tt.default_reminder_time}" style="width:90px;"></td>
            <td>${tt.default_assigned_to}</td>
            <td><div class="toggle-switch ${tt.is_active ? 'active' : ''}" onclick="toggleTemplate('${tt.template_id}'); handleRoute()"></div></td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div style="padding:16px;">
      ${ActionButton('+ Add Template', "showToast('Coming soon')", { type: 'success' })}
    </div>
  `;
}

function renderAdminEscalation() {
  return `
    ${SectionTitle('⚠️ Escalation Rules')}
    ${AppData.escalationRules.map(rule => Card(`
      <div class="toggle-row">
        <div style="flex:1;">
          <strong>${rule.conditionHi || rule.condition}</strong>
          <div style="font-size:12px; color:var(--gray-500);">${rule.condition}</div>
          <div style="font-size:12px; color:var(--gray-500);">Action: ${rule.action}</div>
          ${rule.threshold !== null ? `<div style="font-size:12px; color:var(--primary);">Threshold: ${rule.threshold}</div>` : ''}
        </div>
        <div class="toggle-switch ${rule.is_active ? 'active' : ''}" onclick="toggleEscalation('${rule.id}')"></div>
      </div>
    `)).join('')}
  `;
}

function toggleEscalation(ruleId) {
  const rule = AppData.escalationRules.find(r => r.id === ruleId);
  if (rule) { rule.is_active = !rule.is_active; handleRoute(); }
}

function renderAdminCompetitive() {
  // Aggregate lost deal data
  const byReason = {};
  const byCompetitor = {};
  AppData.lostDeals.forEach(ld => {
    byReason[ld.loss_reason] = (byReason[ld.loss_reason] || 0) + 1;
    if (ld.competitor_name) {
      byCompetitor[ld.competitor_name] = (byCompetitor[ld.competitor_name] || 0) + 1;
    }
  });

  return `
    ${SectionTitle('🔍 Competitive Intelligence')}
    ${Card(`
      <strong>Lost Deal Reasons</strong>
      <div style="margin-top:8px;">
        ${Object.entries(byReason).map(([reason, count]) => `
          <div style="display:flex; align-items:center; gap:8px; margin:6px 0;">
            <div style="flex:1; font-size:14px;">${reason}</div>
            <div style="background:var(--red-light); padding:2px 8px; border-radius:10px; font-size:12px; font-weight:600; color:var(--red-dark);">${count}</div>
          </div>
        `).join('')}
      </div>
    `)}
    ${Object.keys(byCompetitor).length > 0 ? Card(`
      <strong>Competitors Mentioned</strong>
      <div style="margin-top:8px;">
        ${Object.entries(byCompetitor).map(([name, count]) => `
          <div style="display:flex; align-items:center; gap:8px; margin:6px 0;">
            <div style="flex:1; font-size:14px;">🏪 ${name}</div>
            <div style="background:var(--yellow-light); padding:2px 8px; border-radius:10px; font-size:12px; font-weight:600;">${count} times</div>
          </div>
        `).join('')}
      </div>
    `) : ''}

    ${SectionTitle('📋 Lost Deals Log')}
    ${AppData.lostDeals.map(ld => Card(`
      <div style="display:flex; justify-content:space-between;">
        <strong>${ld.customer_name}</strong>
        <span class="badge badge-red">${ld.loss_reason}</span>
      </div>
      <div style="font-size:12px; color:var(--gray-500); margin-top:4px;">
        Products: ${ld.products_requested.join(', ')}
        ${ld.competitor_name ? ` | Competitor: ${ld.competitor_name}` : ''}
        ${ld.competitor_price ? ` | Their price: ${formatCurrency(ld.competitor_price)}` : ''}
        ${ld.our_quoted_price ? ` | Our quote: ${formatCurrency(ld.our_quoted_price)}` : ''}
      </div>
      <div style="font-size:11px; color:var(--gray-400); margin-top:4px;">${formatDate(ld.created_at)}</div>
    `)).join('')}
  `;
}

function renderAdminSettings() {
  return `
    ${SectionTitle('⚙️ System Settings')}
    ${Card(`
      <div class="toggle-row">
        <div><strong>WhatsApp Notifications</strong><div style="font-size:12px;color:var(--gray-500)">Enable automated messages</div></div>
        <div class="toggle-switch active"></div>
      </div>
      <div class="toggle-row">
        <div><strong>Auto Payment Reminders</strong><div style="font-size:12px;color:var(--gray-500)">1 day before due date</div></div>
        <div class="toggle-switch active"></div>
      </div>
      <div class="toggle-row">
        <div><strong>Call Recording</strong><div style="font-size:12px;color:var(--gray-500)">Via Exotel</div></div>
        <div class="toggle-switch active"></div>
      </div>
      <div class="toggle-row">
        <div><strong>Morning Summary (9 AM)</strong><div style="font-size:12px;color:var(--gray-500)">Father को daily summary</div></div>
        <div class="toggle-switch active"></div>
      </div>
      <div class="toggle-row">
        <div><strong>Evening Summary (7 PM)</strong><div style="font-size:12px;color:var(--gray-500)">Father को daily recap</div></div>
        <div class="toggle-switch active"></div>
      </div>
      <div class="toggle-row">
        <div><strong>Weekly Summary (Sunday)</strong><div style="font-size:12px;color:var(--gray-500)">Owner को weekly report</div></div>
        <div class="toggle-switch active"></div>
      </div>
    `)}

    ${SectionTitle('📱 Integration Config')}
    ${Card(`
      ${FormTextInput('WhatsApp Business API Key', 'wa-key', { placeholder: 'API key...', value: 'sk-wa-***********' })}
      ${FormTextInput('Exotel SID', 'exotel-sid', { placeholder: 'Exotel account SID', value: 'exo-***********' })}
      ${FormTextInput('OpenAI API Key', 'openai-key', { placeholder: 'For Whisper + GPT', value: 'sk-***********' })}
      ${ActionButton('💾 Save', "showToast('✅ Settings saved')", { type: 'primary' })}
    `)}

    <div style="padding:16px; text-align:center;">
      <div style="font-size:12px; color:var(--gray-400); margin-top:20px;">
        ShopSaathi v1.0 — HTML Prototype<br>
        Built for Nagin Nagar Building Materials, Indore
      </div>
    </div>
  `;
}
