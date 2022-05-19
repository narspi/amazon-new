import React from 'react';
import moment from 'moment';
import Currency from 'react-currency-formatter';

const Order = ({ order }) => {
	const { id, amount, amountShipping, timestamp, images, items } = order;
	return (
		<div className="relative border rounded-md">
			<div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
				<div>
					<p className="font-bold text-xs">ORDER PLACED</p>
					<p>{moment.unix(timestamp).format('DD MM YYYY')}</p>
				</div>
				<div>
					<p className="text-xs font-bold">TOTAL</p>
					<p>
						<Currency quantity={amount} currency="USD" /> - Next Day Delivery{' '}
						<Currency quantity={amountShipping} currency="USD" />
					</p>
				</div>
				<p className="text-sm whitespace-nowrap sm:text-sm self-end flex-1 text-right text-blue-500">
					{items.length} items
				</p>
				<p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
			</div>
			<div className="p-5 sm:p-10">
				<div className='flex space-x-6 overflow-x-auto'>
					{images.map((image) => (
						<img className="h-20 object-contain sm:h-32" src={image} alt="product image" />
					))}
				</div>
			</div>
		</div>
	);
};

export default Order;
