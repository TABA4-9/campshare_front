export default function Home() {
    return (
        <div className="flex min-w-screen min-h-screen px-10">
            <div className="flex flex-col justify-between min-w-[100%] min-h-[50%] rounded-3xl bg-[url('./assets/picture1.jpg')] bg-cover text-white ">
                <div/>
                <div className="flex flex-col align-middle pt-20 pl-20">
                    <div className="text-5xl">
                        CampShare
                    </div>
                    <div className="text-2xl pt-8">
                        캠핑, 부담은 감소하고 즐거움은 증가하다.
                    </div>
                </div>
                <div/>
            </div>
        </div>
    )
}