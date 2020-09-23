import React from "react";
import Iframe from 'react-iframe'
import MetaInfo from '../../Components/MetaInfo';
import { RoutesConfig } from '../../Helpers/routes.config';
const urls = [
    "https://wpintegrate.net/outlook-calendar-calendar#primary",
    "https://arstechnica.com/gadgets/2017/10/windows-10-fall-creators-update-lots-of-small-changes-and-maybe-the-revolution/",
    "https://www.theverge.com/2017/10/17/16481628/microsoft-surface-book-2-price-release-date-specs-availability-processor"
];
interface RssState {
    selectedUrl: string,
    urls: string[],
    content: string
}
interface RssProps {
}

export class RSS extends React.Component<RssProps, RssState>{
    constructor(props: any) {
        super(props)
        this.state = {
            selectedUrl: urls[0],
            urls: urls,
            content: "TBD"
        }
    }
    onUrlSelect = (e: any, url: any) => {
        e.preventDefault();
        //console.log("selected Url Index: ", url);
        this.setState({ selectedUrl: url });

    }

    componentWillMount() {
        this.loadData(this.state.selectedUrl);
    }
    loadData = (url: any) => {
        fetch(url).then(function (response) {
            console.log(url + " -> " + response.ok);
            return response.text();
        })
            .then(res => {
                console.log("data: ", res);
                this.setState({ content: res });
            })
            .catch(err => {
                console.log("failed to load ", url, err.stack);
            });
    }

    render() {
        return (
            <div>
                <MetaInfo title={RoutesConfig.RSS.metaInfo.title} description={RoutesConfig.RSS.metaInfo.title}></MetaInfo>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                <Iframe url="https://wpintegrate.net/outlook-calendar-calendar#primary"
                    width="1200px"
                    height="800px"
                    id="myId"
                    className="myClassname"
                    display="block"
                    position="relative" />
            </div>
        )
    }
}