"use client";

import { useState, useEffect } from 'react';
import { Download, Search, LogOut, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

type Order = {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  orderType: string;
  items: { productName: string }[];
  totalPrice: number;
  status: 'NOUVEAU' | 'CONFIRME' | 'LIVRE' | 'ANNULE';
  createdAt: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'rohe2025admin') { // Normally verified on server, but specified directly or env
      localStorage.setItem('admin_token', 'true');
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setOrders([]);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': 'Bearer rohe-secret-token' }
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des commandes");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer rohe-secret-token'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as Order['status'] } : o));
      }
    } catch {
      alert("Erreur lors de la mise à jour");
    }
  };

  const exportCSV = () => {
    const headers = "Date,Ref,Nom,Téléphone,Ville,Adresse,Produits,Total,Statut\n";
    const csv = orders.map(o => {
      const date = new Date(o.createdAt).toLocaleString('fr-FR');
      const items = o.items.map((i: { productName: string }) => i.productName).join(' + ');
      return `"${date}","${o.reference}","${o.customerName}","${o.customerPhone}","${o.city}","${o.address}","${items}",${o.totalPrice},"${o.status}"`;
    }).join('\n');

    const blob = new Blob([headers + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ROHE-Export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <div className="bg-white p-10 max-w-md w-full text-center rounded-sm">
          <h1 className="font-serif text-3xl text-charcoal mb-2">Administration</h1>
          <p className="text-taupe text-sm uppercase tracking-widest mb-8">Accès Réseau ROHE</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-border p-4 text-center focus:outline-none focus:border-gold"
              placeholder="Mot de passe"
              required
            />
            <button type="submit" className="w-full bg-gold text-charcoal py-4 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors">
              Connexion
            </button>
            <Link href="/" className="block mt-4 text-xs text-taupe hover:text-charcoal underline">Retour au site</Link>
          </form>
        </div>
      </div>
    );
  }

  // Derived state
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const searchString = `${o.customerName} ${o.reference} ${o.customerPhone}`.toLowerCase();
    const matchesSearch = searchString.includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders.filter(o => o.status === 'LIVRE').reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-charcoal text-cream py-6 px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-2xl tracking-[0.2em] uppercase">ROHE <span className="text-gold italic">Admin</span></h1>
          <Link href="/" className="text-xs text-taupe hover:text-white underline">Voir le site</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-taupe">Chiffre d&apos;affaires (Livré)</p>
            <p className="text-xl text-gold">
              <span className="font-sans font-semibold not-italic tracking-normal">{totalRevenue}</span> DH
            </p>
          </div>
          <button onClick={handleLogout} className="text-taupe hover:text-white" title="Déconnexion">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
              <input 
                type="text" 
                placeholder="Rechercher nom, réf, tél..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border focus:border-gold outline-none text-sm"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-border py-2 px-4 focus:border-gold outline-none text-sm text-charcoal bg-white"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="NOUVEAU">Nouveau</option>
              <option value="CONFIRME">Confirmé</option>
              <option value="LIVRE">Livré</option>
              <option value="ANNULE">Annulé</option>
            </select>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={fetchOrders} className="flex items-center gap-2 text-charcoal border border-border bg-white px-4 py-2 hover:bg-warm-white transition text-sm">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Actualiser
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 bg-gold text-charcoal px-4 py-2 hover:bg-light-gold transition text-sm font-medium">
              <Download className="w-4 h-4" /> Exporter CSV
            </button>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-warm-white border-b border-border text-[10px] uppercase tracking-widest text-taupe">
              <tr>
                <th className="px-6 py-4 font-bold">Réf / Date</th>
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Localisation</th>
                <th className="px-6 py-4 font-bold">Produits</th>
                <th className="px-6 py-4 font-bold text-right">Total</th>
                <th className="px-6 py-4 font-bold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading && orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-taupe">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Chargement des commandes...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-taupe">Aucune commande trouvée.</td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-sans font-semibold not-italic tracking-normal text-charcoal">{order.reference}</p>
                      <p className="text-xs text-taupe font-sans not-italic tracking-normal">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-charcoal">{order.customerName}</p>
                      <p className="text-xs text-taupe">
                        <span className="font-sans font-semibold not-italic tracking-normal">{order.customerPhone}</span>
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-charcoal">{order.city}</p>
                      <p className="text-xs text-taupe truncate max-w-[150px]" title={order.address}>{order.address}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-warm-white border border-border px-2 py-1 text-xs text-charcoal">
                        <span className="font-sans font-semibold not-italic tracking-normal text-gold">{order.items.length}</span> article(s)
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-charcoal">
                        <span className="font-sans font-semibold not-italic tracking-normal">{order.totalPrice}</span> DH
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 border outline-none cursor-pointer rounded-sm ${
                          order.status === 'NOUVEAU' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          order.status === 'CONFIRME' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          order.status === 'LIVRE' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="NOUVEAU">Nouveau</option>
                        <option value="CONFIRME">Confirmé</option>
                        <option value="LIVRE">Livré</option>
                        <option value="ANNULE">Annulé</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
