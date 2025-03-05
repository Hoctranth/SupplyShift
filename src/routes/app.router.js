import { Fragment } from 'react';

function AppRouter() {
	const Routes = ProtectedRouter;
	return (
		<Fragment>
			<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/user" element={<UserManager />} />
					<Route path="/warehouse" element={<ProductManager />} />
					<Route path="/order" element={<OrderManager />} />
					<Route path="/ship" element={<ShipManager />} />
					<Route path="/setting" element={<Setting />} />
					<Route path="/baocaothongke" element={<Statics />} />
					</Routes>
		</Fragment>
	);
}

export default AppRouter;
