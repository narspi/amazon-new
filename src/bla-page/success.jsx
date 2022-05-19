import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const Success = () => {
    const router = useRouter();
    const fooClickMyOrdersBtn = () => {
        router.push('/orders');
    }
	return (
		<div className="bg-gray-100 h-screen ">
			<Header />
			<main className="max-w-screen-lg m-auto">
				<div className="flex flex-col p-10 bg-white">
					<div className="flex items-center spase-x-2 mb-5">
						<CheckCircleIcon className="text-green-500 h-10" />
						<h1 className="text-3xl">Thank you, your has been confirmed!</h1>
					</div>
					<p>
						Thank you for shopping width us. We'll send a confirmation once your item has shipped, if you
						would like to check the status of you order(s) please press the link below.
					</p>
                    <button onClick={fooClickMyOrdersBtn} className='button mt-5'>Go to my orders</button>
				</div>
			</main>
		</div>
	);
};

export default Success;
