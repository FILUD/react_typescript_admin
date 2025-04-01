import CoffeeData from "../components/ui/ProductData"
import DrawerMenu from "../components/ui/DrawerMenu"
import MemberData from "../components/ui/MemberData"
import NullData from "../components/ui/NullData"
import OrderData from "../components/ui/OrderData"

function Dashboard() {
    return (
        <main className="bg-stone-200 h-[100vh]">
            <header className="px-[1vw] pt-5">
                <DrawerMenu />
            </header>
            <div className="px-[10vw] flex flex-col gap-10 pt-5">
                <section className="grid gap-10 grid-cols-4">
                    <MemberData />
                    <CoffeeData />
                    <div className="col-span-2">
                        <NullData />
                    </div>
                </section>

                <section className="grid gap-10 grid-cols-4">
                    <div className="col-span-2">
                    <OrderData />
                    </div>
                    <div className="col-span-2">
                        <NullData />
                    </div>
                </section>
            </div>

        </main>
    )
}

export default Dashboard