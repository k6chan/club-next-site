import {Container, Modal} from "react-bootstrap"
import PageHeader from "../components/pageheader"
import MyImage from "../components/myimage"
import {useState} from "react"
import GalleryData from "../data/gallery.json"


function CreatorLink({credit}) {
    if (credit["url"]) {
        return (
            <a href={credit["url"]}>{credit["creator"]}</a>
        )
    } else {
        return (
            <>{credit["creator"]}</>
        )
    }
}

function Caption({item}) {
    if (item["credits"]) {
        return (
            <>
                {item["credits"].map((credit, index) => (
                    <span className="caption-size" key={index}>
                        {index <= 0 && item["description"] + " by "}
                        <CreatorLink credit={credit}/>
                        {index < item["credits"].length - 1 && item["credits"].length > 2 && ','}
                        {index < item["credits"].length - 1 && ' '}
                        {index === item["credits"].length - 2 && 'and '}
                    </span>
                ))}
            </>
        )
    }
    else {
        return (
            <span className="caption-size text-center">{item["description"]}</span>
        )
    }
}

function ModalContent({item, onHandleClose}) {
    return (
        <Modal show centered onHide={onHandleClose} size="lg">
            <MyImage src={item["image"]} alt={item["description"]} className="w-100"/>
            <Modal.Footer><Caption item={item}/></Modal.Footer>
        </Modal>
    )
}

function ItemDisplay({item, setCurrentItem}) {
    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 p-2 d-inline-flex flex-column">
            <MyImage src={item["image"]} alt={item["description"]} className="image-pointer p-1"
                     onClick={() => setCurrentItem(item)}/>
            <Caption item={item}/>
        </div>
    )
}

export default function Gallery() {
    const [currentItem, setCurrentItem] = useState(null)
    const handleItem = () => setCurrentItem(null)

    // sort years
    const yearsSorted = Object.keys(GalleryData["gallery"]).sort((y1, y2) => y2.localeCompare(y1))
    return (
        <div className="min-vh-100">
            <PageHeader src="images/header_images/gallery_banner.png" className="mb-4">Gallery</PageHeader>
            <Container className="mb-4">
                {yearsSorted.map((year, index) => (
                    <div key={index}>
                        <p className="title-size title-font-condensed text-uppercase border-bottom">{year}</p>
                        <div className="d-inline-flex flex-wrap align-items-start mw-100">
                            {GalleryData["gallery"][year].map((item, index) => (
                                <ItemDisplay item={item} key={index} onHandleClose={handleItem}
                                             setCurrentItem={setCurrentItem}/>
                            ))}
                        </div>
                    </div>
                ))}
                {(currentItem != null) && <ModalContent item={currentItem} onHandleClose={handleItem}/>}
            </Container>
        </div>
    )
}
