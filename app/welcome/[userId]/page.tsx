import React from 'react';

type DeliveryData = {
  freeGift: boolean;
  title: string;
  message: string;
  totalPrice: number;
}

// Encapsulated here for simplicity, could be extracted if reused elsewhere
const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <p className="text-red-600 text-lg font-semibold">{message}</p>
    </div>
  );
};

// Fetches the delivery data from the API and either returns the data or an error message
// it could've been moved to a utils file but in this case it's only used here so no need
const fetchDeliveryData = async (userId: string): Promise<{ data?: DeliveryData; error?: string }> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/comms/your-next-delivery/${userId}`);

    if (!res.ok) {
      if (res.status === 404) {
        return { error: 'User not found.' };
      } else if (res.status === 400) {
        return { error: 'Invalid request. Please check the user ID.' };
      }

      throw new Error('Unexpected error');
    }

    const data = await res.json();
    return { data };
  } catch {
    return { error: 'Something went wrong. Please try again later.' };
  }
};

const WelcomePage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const { data, error } = await fetchDeliveryData(userId);

  if (error) return <ErrorComponent message={error} />;

  if (!data) return <ErrorComponent message="No delivery data found." />;

  const { freeGift, title, message, totalPrice } = data;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row w-full md:w-[752px] md:h-[270px] border border-grey-2 bg-white relative rounded-sm mt-[26.5px] md:mt-0">
        {freeGift && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0 md:-top-2 md:-right-2 w-[91px] h-[25px] bg-pink-1 rotate-[-4.75deg] md:rotate-[8.61deg] flex items-center justify-center border border-pink-3 z-20">
            <p className="text-[13px] font-bold text-pink-2">FREE GIFT</p>
          </div>
        )}

        <div className="absolute -top-[26.5px] left-1/2 -translate-x-1/2 w-[53px] h-[53px] rounded-full md:w-[400px] md:h-full md:rounded-none md:static md:translate-x-0 bg-[url('/tiger.png')] bg-cover bg-center z-10" />

        <div className="w-full py-10 px-5 flex flex-col text-center md:text-left">
          <p className="font-bold text-green-primary">{title}</p>
          <p className="text-sm font-light text-grey-1">{message}</p>
          <p className="text-sm text-grey-1 mt-5">
            <span className="font-bold">Total price: £{totalPrice.toFixed(2)}</span>
          </p>

          <div className="flex gap-2 md:gap-5 mt-5 md:mt-12">
            <button type="button" className="flex-1 md:flex-none whitespace-nowrap text-white bg-green-primary font-semibold rounded-sm text-sm px-4 md:px-[54px] py-[8px] flex items-center justify-center">
              SEE DETAILS
            </button>
            <button type="button" className="flex-1 md:flex-none whitespace-nowrap text-green-primary bg-white border border-green-primary font-semibold rounded-sm text-sm px-4 md:px-[54px] py-[8px] flex items-center justify-center">
              EDIT DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;