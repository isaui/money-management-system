import Stack from "@/components/elements/Stack"

const GetStartedSection = () => {
    return <div className="w-full flex mx-auto max-w-7xl mb-8 ">
        <Stack>
                <div className="flex flex-col relative w-full  text-white font-bold text-5xl px-4 mx-auto">
                    <h1 className="md:mx-auto md:text-center mb-4">
                    Taming Finances,
                    </h1>
                    <h1 className="mb-8 md:mx-auto md:text-center">
                    Securing Your Tomorrow
                    </h1>
                    <p className="mb-8 md:mx-auto md:max-w-[75%] text-lg text-justify text-gray-500 font-normal">{"RFinance is your ultimate companion in the journey towards financial freedom. With intuitive tools, insightful guidance, and personalized strategies, we empower you to take control of your finances, make informed decisions, and pave the way for a prosperous future. Let RFinance be your trusted ally in navigating the complexities of money management, so you can thrive and achieve your dreams with confidence."}</p>
                    <div>
                    <button className="md:mx-auto h-min text-center px-4 py-3 text-lg text-white rounded-md btn-grad-purple">Get Started</button>
                    </div>
            </div>
        </Stack>
    </div>
}

export default GetStartedSection