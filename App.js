import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, FlatList, Modal, StatusBar, Animated, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const W = Dimensions.get('window').width;
const BLUE = '#1A3A6B';
const ORANGE = '#F7941D';
const LIGHT = '#F5F7FF';

const PRODUCTS = [
  { id: '1', name: 'HP Laptop 15s', price: 45000, stock: 8, category: 'Laptop' },
  { id: '2', name: 'Dell Monitor 24"', price: 12000, stock: 15, category: 'Monitor' },
  { id: '3', name: 'Canon Printer MG3077', price: 4500, stock: 20, category: 'Printer' },
  { id: '4', name: 'Logitech Keyboard', price: 800, stock: 30, category: 'Accessories' },
  { id: '5', name: 'Optical Mouse', price: 350, stock: 50, category: 'Accessories' },
  { id: '6', name: 'CC Camera 2MP', price: 1800, stock: 12, category: 'Security' },
  { id: '7', name: 'DVR 4 Channel', price: 3500, stock: 6, category: 'Security' },
  { id: '8', name: 'RAM DDR4 8GB', price: 1800, stock: 25, category: 'PC Parts' },
  { id: '9', name: 'SSD 256GB', price: 2800, stock: 18, category: 'PC Parts' },
  { id: '10', name: 'SMPS 450W', price: 1200, stock: 10, category: 'PC Parts' },
  { id: '11', name: 'Printer Ink Black', price: 320, stock: 40, category: 'Consumables' },
  { id: '12', name: 'HDMI Cable 3m', price: 250, stock: 60, category: 'Accessories' },
];

const CUSTOMERS = [
  { id: 'C001', name: 'Ravi Kumar', phone: '9876543210', udhaar: 5000, purchases: 3, lastVisit: 'Today' },
  { id: 'C002', name: 'Suresh Babu', phone: '9876543211', udhaar: 0, purchases: 7, lastVisit: 'Yesterday' },
  { id: 'C003', name: 'Priya Shop', phone: '9876543212', udhaar: 12000, purchases: 15, lastVisit: '2 days ago' },
  { id: 'C004', name: 'Tech Solutions', phone: '9876543213', udhaar: 0, purchases: 22, lastVisit: 'Today' },
  { id: 'C005', name: 'Ganesh Electronics', phone: '9876543214', udhaar: 3500, purchases: 9, lastVisit: '3 days ago' },
];

const BILLS = [
  { id: 'INV001', customer: 'Ravi Kumar', items: [{ name: 'HP Laptop 15s', qty: 1, price: 45000 }, { name: 'Optical Mouse', qty: 1, price: 350 }], total: 45350, gst: 8163, date: 'Today', payment: 'Cash', status: 'Paid' },
  { id: 'INV002', customer: 'Suresh Babu', items: [{ name: 'CC Camera 2MP', qty: 2, price: 3600 }, { name: 'DVR 4 Channel', qty: 1, price: 3500 }], total: 7100, gst: 1278, date: 'Today', payment: 'UPI', status: 'Paid' },
  { id: 'INV003', customer: 'Priya Shop', items: [{ name: 'RAM DDR4 8GB', qty: 1, price: 1800 }, { name: 'SSD 256GB', qty: 1, price: 2800 }, { name: 'SMPS 450W', qty: 1, price: 1200 }], total: 5800, gst: 1044, date: 'Yesterday', payment: 'UPI', status: 'Paid' },
  { id: 'INV004', customer: 'Tech Solutions', items: [{ name: 'Dell Monitor 24"', qty: 2, price: 24000 }], total: 24000, gst: 4320, date: 'Yesterday', payment: 'Bank', status: 'Paid' },
  { id: 'INV005', customer: 'Ganesh Electronics', items: [{ name: 'Canon Printer MG3077', qty: 1, price: 4500 }, { name: 'Printer Ink Black', qty: 3, price: 960 }], total: 5460, gst: 983, date: '2 days ago', payment: 'Cash', status: 'Udhaar' },
];

const ORDERS = [
  { id: 'ORD001', customer: 'Ravi Kumar', product: 'HP Laptop 15s', qty: 1, status: 'Delivered', date: 'Today' },
  { id: 'ORD002', customer: 'Priya Shop', product: 'Dell Monitor x2', qty: 2, status: 'Pending', date: 'Today' },
  { id: 'ORD003', customer: 'Ganesh Electronics', product: 'CC Camera 2MP x4', qty: 4, status: 'Processing', date: 'Yesterday' },
  { id: 'ORD004', customer: 'Tech Solutions', product: 'RAM DDR4 8GB x5', qty: 5, status: 'Delivered', date: 'Yesterday' },
];

function BillNovaLogo() {
  const glow = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 60, friction: 6, useNativeDriver: true }),
      Animated.loop(Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ]))
    ]).start();
  }, []);
  const opacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });
  return (
    <Animated.View style={{ alignItems: 'center', transform: [{ scale }], opacity }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', elevation: 10, borderWidth: 3, borderColor: ORANGE }}>
        <Text style={{ fontSize: 38, fontWeight: 'bold', color: ORANGE }}>N</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: BLUE }}>BILL</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: ORANGE }}>NOVA</Text>
      </View>
      <Text style={{ fontSize: 9, color: '#aaa', letterSpacing: 2, marginTop: 2 }}>FINANCE • INNOVATION • ENERGY</Text>
    </Animated.View>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4FF' }}>
      <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <BillNovaLogo />
          </View>

          <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 28, elevation: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20 }}>
            <Text style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>Please enter your details</Text>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 28 }}>Welcome back</Text>

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8 }}>Email address</Text>
            <TextInput
              style={S.input}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8 }}>Password</Text>
            <View style={{ position: 'relative', marginBottom: 16 }}>
              <TextInput
                style={[S.input, { marginBottom: 0, paddingRight: 50 }]}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity style={{ position: 'absolute', right: 16, top: 16 }} onPress={() => setShowPass(!showPass)}>
                <Text style={{ fontSize: 18 }}>{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => setRemember(!remember)}>
                <View style={{ width: 20, height: 20, borderWidth: 2, borderColor: remember ? BLUE : '#ddd', borderRadius: 4, backgroundColor: remember ? BLUE : '#fff', alignItems: 'center', justifyContent: 'center' }}>
                  {remember && <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
                </View>
                <Text style={{ fontSize: 13, color: '#555' }}>Remember for 30 days</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Reset Password', 'OTP sent to your email!')}>
                <Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[S.btn, { backgroundColor: BLUE, marginBottom: 12 }]} onPress={() => { if (!email || !password) { Alert.alert('Error', 'Please fill all fields'); return; } onLogin(); }}>
              <Text style={S.btnText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 12, padding: 14, gap: 10, marginBottom: 20 }} onPress={() => Alert.alert('Google Sign In', 'Google authentication coming soon!')}>
              <Text style={{ fontSize: 20 }}>G</Text>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }}>Sign in with Google</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={{ color: '#888', fontSize: 13 }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => Alert.alert('Register', 'Registration coming soon!')}>
                <Text style={{ color: BLUE, fontSize: 13, fontWeight: '700' }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function DashboardScreen({ onLogout, onNavigate }) {
  const todaySales = BILLS.filter(b => b.date === 'Today').reduce((s, b) => s + b.total, 0);
  const totalRevenue = BILLS.reduce((s, b) => s + b.total, 0);
  const totalUdhaar = CUSTOMERS.reduce((s, c) => s + c.udhaar, 0);
  const lowStock = PRODUCTS.filter(p => p.stock < 10).length;

  const cards = [
    { title: "Today's Sales", value: '₹' + todaySales.toLocaleString(), color: BLUE, bg: '#E8EDF7', icon: '💰' },
    { title: 'Total Bills', value: String(BILLS.length), color: '#2E7D32', bg: '#E8F5E9', icon: '🧾' },
    { title: 'Products', value: String(PRODUCTS.length), color: '#E65100', bg: '#FFF3E0', icon: '📦' },
    { title: 'Udhaar', value: '₹' + totalUdhaar.toLocaleString(), color: '#C62828', bg: '#FFEBEE', icon: '⚠️' },
  ];

  const menu = [
    { title: 'Create Bill', icon: '🧾', color: BLUE, screen: 'bills' },
    { title: 'Products', icon: '📦', color: '#2E7D32', screen: 'products' },
    { title: 'Customers', icon: '👥', color: '#E65100', screen: 'customers' },
    { title: 'Orders', icon: '🚚', color: '#6A1B9A', screen: 'orders' },
    { title: 'Ledger', icon: '📒', color: '#00695C', screen: 'ledger' },
    { title: 'Reports', icon: '📊', color: '#1565C0', screen: 'reports' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View>
            <View style={{ backgroundColor: BLUE, padding: 20, paddingBottom: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>N</Text>
                  </View>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>BillNova</Text>
                    <Text style={{ color: '#fff', opacity: 0.75, fontSize: 12 }}>Harshith's Electronics</Text>
                  </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 }} onPress={onLogout}>
                  <Text style={{ color: '#fff', fontSize: 13 }}>Logout</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#fff', opacity: 0.85, fontSize: 13, marginTop: 12 }}>👋 Welcome back, Harshith!</Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10, marginTop: -10 }}>
              {cards.map((c, i) => (
                <View key={i} style={{ width: '46%', margin: '2%', backgroundColor: c.bg, borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: c.color, elevation: 3 }}>
                  <Text style={{ fontSize: 22 }}>{c.icon}</Text>
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: c.color, marginTop: 8 }}>{c.value}</Text>
                  <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{c.title}</Text>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: BLUE, marginHorizontal: 16, borderRadius: 20, padding: 22, elevation: 5, alignItems: 'center' }}>
              <Text style={{ color: '#fff', opacity: 0.8, fontSize: 13 }}>This Month Revenue</Text>
              <Text style={{ color: ORANGE, fontSize: 38, fontWeight: 'bold', marginTop: 4 }}>₹{totalRevenue.toLocaleString()}</Text>
              <Text style={{ color: '#fff', opacity: 0.7, fontSize: 12, marginTop: 4 }}>Est. Profit ~₹{Math.round(totalRevenue * 0.22).toLocaleString()} • {BILLS.length} invoices</Text>
            </View>

            <Text style={S.sectionTitle}>Quick Actions</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 }}>
              {menu.map((m, i) => (
                <TouchableOpacity key={i} style={{ width: '46%', margin: '2%', backgroundColor: m.color, borderRadius: 16, padding: 18, alignItems: 'center', elevation: 3 }} onPress={() => onNavigate(m.screen)}>
                  <Text style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</Text>
                  <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>{m.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={S.sectionTitle}>Recent Bills</Text>
            {BILLS.slice(0, 3).map(b => (
              <View key={b.id} style={S.card}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', color: '#1a1a2e', fontSize: 15 }}>{b.customer}</Text>
                  <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{b.items.map(i => i.name).join(', ')}</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                    <Text style={[S.badge, { backgroundColor: b.status === 'Paid' ? '#E8F5E9' : '#FFEBEE', color: b.status === 'Paid' ? '#2E7D32' : '#C62828' }]}>{b.status}</Text>
                    <Text style={[S.badge, { backgroundColor: '#F5F5F5', color: '#555' }]}>{b.payment}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#2E7D32' }}>₹{b.total.toLocaleString()}</Text>
                  <Text style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>{b.date}</Text>
                </View>
              </View>
            ))}

            <Text style={S.sectionTitle}>⚠️ Low Stock Alert</Text>
            {PRODUCTS.filter(p => p.stock < 10).map(p => (
              <View key={p.id} style={[S.card, { borderLeftWidth: 4, borderLeftColor: '#C62828' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', color: '#1a1a2e' }}>{p.name}</Text>
                  <Text style={{ color: '#888', fontSize: 12 }}>{p.category}</Text>
                </View>
                <Text style={{ color: '#C62828', fontWeight: 'bold', fontSize: 16 }}>Only {p.stock} left!</Text>
              </View>
            ))}
            <View style={{ height: 30 }} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

function BillsScreen({ onBack }) {
  const [selected, setSelected] = useState(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>🧾 Invoices</Text>
        <TouchableOpacity style={[S.hBtn, { backgroundColor: ORANGE }]}><Text style={S.hBtnTxt}>+ New</Text></TouchableOpacity>
      </View>
      <FlatList
        data={BILLS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={S.card} onPress={() => setSelected(item)}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#aaa', fontWeight: '600' }}>#{item.id}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1a1a2e', marginTop: 2 }}>{item.customer}</Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{item.items.map(i => `${i.name} x${i.qty}`).join(', ')}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                <Text style={[S.badge, { backgroundColor: item.status === 'Paid' ? '#E8F5E9' : '#FFEBEE', color: item.status === 'Paid' ? '#2E7D32' : '#C62828' }]}>{item.status}</Text>
                <Text style={[S.badge, { backgroundColor: '#F0F4FF', color: BLUE }]}>{item.payment}</Text>
                <Text style={[S.badge, { backgroundColor: '#F5F5F5', color: '#555' }]}>GST: ₹{item.gst}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32' }}>₹{item.total.toLocaleString()}</Text>
              <Text style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '85%' }}>
            {selected && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: BLUE }}>BILL</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: ORANGE }}>NOVA</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: '#aaa', letterSpacing: 2 }}>FINANCE • INNOVATION • ENERGY</Text>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginTop: 12 }} />
                </View>
                {[['Invoice#', selected.id], ['Customer', selected.customer], ['Date', selected.date], ['Payment', selected.payment]].map(([l, v]) => (
                  <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#888', fontSize: 13 }}>{l}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{v}</Text>
                  </View>
                ))}
                <View style={{ backgroundColor: '#F5F7FF', borderRadius: 12, padding: 12, marginVertical: 12 }}>
                  {selected.items.map((item, i) => (
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ fontSize: 13, color: '#333', flex: 1 }}>{item.name} x{item.qty}</Text>
                      <Text style={{ fontSize: 13, fontWeight: '600' }}>₹{item.price.toLocaleString()}</Text>
                    </View>
                  ))}
                </View>
                {[['Subtotal', '₹' + (selected.total - selected.gst).toLocaleString()], ['GST (18%)', '₹' + selected.gst.toLocaleString()]].map(([l, v]) => (
                  <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ color: '#888' }}>{l}</Text><Text>{v}</Text>
                  </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderColor: '#eee' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>TOTAL</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#2E7D32' }}>₹{selected.total.toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
                  <TouchableOpacity style={[S.btn, { flex: 1, backgroundColor: '#25D366' }]} onPress={() => Alert.alert('WhatsApp', 'Sharing invoice!')}><Text style={S.btnText}>💬 WhatsApp</Text></TouchableOpacity>
                  <TouchableOpacity style={[S.btn, { flex: 1, backgroundColor: ORANGE }]} onPress={() => Alert.alert('Print', 'Sending to printer!')}><Text style={S.btnText}>🖨️ Print</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 12, padding: 10 }} onPress={() => setSelected(null)}>
                  <Text style={{ color: '#aaa', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function CustomersScreen({ onBack }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>👥 Customers</Text>
        <TouchableOpacity style={[S.hBtn, { backgroundColor: ORANGE }]}><Text style={S.hBtnTxt}>+ Add</Text></TouchableOpacity>
      </View>
      <FlatList
        data={CUSTOMERS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={S.card}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1a1a2e' }}>{item.name}</Text>
              <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>📱 {item.phone}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                <Text style={[S.badge, { backgroundColor: '#E8F5E9', color: '#2E7D32' }]}>{item.purchases} purchases</Text>
                {item.udhaar > 0 && <Text style={[S.badge, { backgroundColor: '#FFEBEE', color: '#C62828' }]}>Udhaar ₹{item.udhaar.toLocaleString()}</Text>}
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('WhatsApp', `Sending message to ${item.name}!`)}>
              <Text style={{ fontSize: 28 }}>💬</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function OrdersScreen({ onBack }) {
  const statusColor = { Delivered: '#2E7D32', Pending: '#E65100', Processing: '#1565C0' };
  const statusBg = { Delivered: '#E8F5E9', Pending: '#FFF3E0', Processing: '#E3F2FD' };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>🚚 Orders</Text>
        <TouchableOpacity style={[S.hBtn, { backgroundColor: ORANGE }]}><Text style={S.hBtnTxt}>+ New</Text></TouchableOpacity>
      </View>
      <FlatList
        data={ORDERS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={S.card}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#aaa' }}>#{item.id}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1a1a2e', marginTop: 2 }}>{item.customer}</Text>
              <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>{item.product}</Text>
              <Text style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>{item.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <Text style={[S.badge, { backgroundColor: statusBg[item.status], color: statusColor[item.status], fontSize: 12 }]}>{item.status}</Text>
              <Text style={{ color: '#888', fontSize: 12 }}>Qty: {item.qty}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function LedgerScreen({ onBack }) {
  const udhaarCustomers = CUSTOMERS.filter(c => c.udhaar > 0);
  const totalUdhaar = udhaarCustomers.reduce((s, c) => s + c.udhaar, 0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>📒 Ledger</Text>
        <View style={{ width: 60 }} />
      </View>
      <FlatList
        data={udhaarCustomers}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View>
            <View style={{ backgroundColor: '#FFEBEE', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#C62828' }}>
              <Text style={{ color: '#C62828', fontSize: 13 }}>Total Udhaar Pending</Text>
              <Text style={{ color: '#C62828', fontSize: 36, fontWeight: 'bold', marginTop: 4 }}>₹{totalUdhaar.toLocaleString()}</Text>
              <Text style={{ color: '#C62828', opacity: 0.7, fontSize: 12, marginTop: 4 }}>from {udhaarCustomers.length} customers</Text>
            </View>
            <Text style={S.sectionTitle}>Udhaar List</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={S.card}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFEBEE', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Text style={{ color: '#C62828', fontSize: 16, fontWeight: 'bold' }}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
              <Text style={{ color: '#888', fontSize: 12 }}>📱 {item.phone}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#C62828', fontWeight: 'bold', fontSize: 17 }}>₹{item.udhaar.toLocaleString()}</Text>
              <TouchableOpacity style={{ marginTop: 6, backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }} onPress={() => Alert.alert('Reminder', `Sending reminder to ${item.name}!`)}>
                <Text style={{ color: '#2E7D32', fontSize: 12, fontWeight: '600' }}>Remind</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function ReportsScreen({ onBack }) {
  const totalRevenue = BILLS.reduce((s, b) => s + b.total, 0);
  const totalGST = BILLS.reduce((s, b) => s + b.gst, 0);
  const todaySales = BILLS.filter(b => b.date === 'Today').reduce((s, b) => s + b.total, 0);
  const cashSales = BILLS.filter(b => b.payment === 'Cash').reduce((s, b) => s + b.total, 0);
  const upiSales = BILLS.filter(b => b.payment === 'UPI').reduce((s, b) => s + b.total, 0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>📊 Reports</Text>
        <View style={{ width: 60 }} />
      </View>
      <FlatList
        data={[
          { label: "Today's Sales", value: '₹' + todaySales.toLocaleString(), icon: '📅', color: BLUE },
          { label: 'Total GST', value: '₹' + totalGST.toLocaleString(), icon: '🏛️', color: '#6A1B9A' },
          { label: 'Cash Sales', value: '₹' + cashSales.toLocaleString(), icon: '💵', color: '#2E7D32' },
          { label: 'UPI Sales', value: '₹' + upiSales.toLocaleString(), icon: '📱', color: '#1565C0' },
          { label: 'Best Product', value: 'HP Laptop 15s', icon: '🏆', color: ORANGE },
          { label: 'Total Invoices', value: String(BILLS.length), icon: '🧾', color: '#00695C' },
        ]}
        keyExtractor={i => i.label}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View style={{ backgroundColor: BLUE, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ color: '#fff', opacity: 0.8 }}>Total Revenue This Month</Text>
            <Text style={{ color: ORANGE, fontSize: 38, fontWeight: 'bold', marginTop: 4 }}>₹{totalRevenue.toLocaleString()}</Text>
            <Text style={{ color: '#fff', opacity: 0.7, marginTop: 4 }}>Profit ~₹{Math.round(totalRevenue * 0.22).toLocaleString()} (22%)</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[S.card, { marginBottom: 10 }]}>
            <Text style={{ fontSize: 26, marginRight: 14 }}>{item.icon}</Text>
            <Text style={{ flex: 1, fontSize: 14, color: '#555' }}>{item.label}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: item.color }}>{item.value}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function ProductsScreen({ onBack }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [cat, setCat] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT }}>
      <StatusBar backgroundColor={BLUE} barStyle="light-content" />
      <View style={S.header}>
        <TouchableOpacity style={S.hBtn} onPress={onBack}><Text style={S.hBtnTxt}>← Back</Text></TouchableOpacity>
        <Text style={S.hTitle}>📦 Products</Text>
        <TouchableOpacity style={[S.hBtn, { backgroundColor: ORANGE }]} onPress={() => setModal(true)}><Text style={S.hBtnTxt}>+ Add</Text></TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={S.card}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1a1a2e' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <Text style={[S.badge, { backgroundColor: '#E8EAF6', color: '#3949AB' }]}>{item.category}</Text>
                <Text style={[S.badge, item.stock < 10 ? { backgroundColor: '#FFEBEE', color: '#C62828' } : { backgroundColor: '#E8F5E9', color: '#2E7D32' }]}>
                  {item.stock < 10 ? '⚠️ ' : '✅ '}Stock: {item.stock}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: BLUE }}>₹{item.price.toLocaleString()}</Text>
          </View>
        )}
      />
      <Modal visible={modal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: BLUE, marginBottom: 16 }}>➕ Add Product</Text>
            <TextInput style={S.input} placeholder="Product Name" value={name} onChangeText={setName} placeholderTextColor="#ccc" />
            <TextInput style={S.input} placeholder="Category" value={cat} onChangeText={setCat} placeholderTextColor="#ccc" />
            <TextInput style={S.input} placeholder="Price (₹)" value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor="#ccc" />
            <TextInput style={S.input} placeholder="Stock Qty" value={stock} onChangeText={setStock} keyboardType="numeric" placeholderTextColor="#ccc" />
            <TouchableOpacity style={[S.btn, { backgroundColor: ORANGE }]} onPress={() => { if (!name || !price || !stock) { Alert.alert('Error', 'Fill all fields'); return; } setProducts([{ id: Date.now().toString(), name, price: parseInt(price), stock: parseInt(stock), category: cat }, ...products]); setName(''); setPrice(''); setStock(''); setCat(''); setModal(false); }}>
              <Text style={S.btnText}>✅ Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 12, padding: 10 }} onPress={() => setModal(false)}>
              <Text style={{ color: '#aaa', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  const [screen, setScreen] = useState('login');
  if (screen === 'login') return <LoginScreen onLogin={() => setScreen('dashboard')} />;
  if (screen === 'products') return <ProductsScreen onBack={() => setScreen('dashboard')} />;
  if (screen === 'bills') return <BillsScreen onBack={() => setScreen('dashboard')} />;
  if (screen === 'customers') return <CustomersScreen onBack={() => setScreen('dashboard')} />;
  if (screen === 'orders') return <OrdersScreen onBack={() => setScreen('dashboard')} />;
  if (screen === 'ledger') return <LedgerScreen onBack={() => setScreen('dashboard')} />;
  if (screen === 'reports') return <ReportsScreen onBack={() => setScreen('dashboard')} />;
  return <DashboardScreen onLogout={() => setScreen('login')} onNavigate={setScreen} />;
}

const S = StyleSheet.create({
  input: { backgroundColor: '#F8F9FF', borderWidth: 1.5, borderColor: '#E8ECF4', borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 14, color: '#333' },
  btn: { backgroundColor: BLUE, padding: 16, borderRadius: 12, alignItems: 'center', elevation: 3 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: BLUE },
  hBtn: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  hBtnTxt: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  hTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', paddingHorizontal: 4, paddingTop: 16, paddingBottom: 10 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  badge: { fontSize: 11, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, fontWeight: '600', overflow: 'hidden' },
});
