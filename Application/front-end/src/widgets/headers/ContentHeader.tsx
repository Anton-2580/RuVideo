import { ColorClassNames } from "@/app/styles/ColorVars"
import { Images, NavigateImageButton, Paths } from "@/shared"
import { ButtonMenu } from "@/widgets/menu"
import { Logo } from "@/widgets/logo"
import { CurrentUserButton } from "@/widgets/currentUser"
import { MobileSearchButton } from "@/widgets/search"
import { Search } from "@/widgets/search"
import styles from "./contentHeader.module.css"


export default function ContentHeader() {
    return (<header>
        <div id={styles.left_content}>
            <ButtonMenu />
            <Logo />
        </div>
        <Search />
        <div id={styles.right_content}>
            <NavigateImageButton to={Paths.ADD_CONTENT} image={Images.add_content} imageClassName={ColorClassNames.defaultImage}/>
            <NavigateImageButton to={Paths.NOTIFICATIONS} image={Images.bell} imageClassName={ColorClassNames.defaultImage}/>
            <MobileSearchButton />
            <CurrentUserButton />
        </div>
    </header>)
}
