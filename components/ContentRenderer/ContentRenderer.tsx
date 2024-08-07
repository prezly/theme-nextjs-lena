import { Component, Elements, Renderer } from '@prezly/content-renderer-react-js';
import type { ExtendedStory } from '@prezly/sdk';
import type { Node } from '@prezly/story-content-format';
import {
    AttachmentNode,
    ButtonBlockNode,
    ContactNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    HtmlNode,
    ImageNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    ParagraphNode,
    QuoteNode,
    StoryBookmarkNode,
    VariableNode,
    VideoNode,
} from '@prezly/story-content-format';
import { useEffect } from 'react';
import { FormattedDate } from 'react-intl';

import {
    Heading,
    Html,
    Link,
    List,
    ListItem,
    ListItemText,
    Paragraph,
    Quote,
} from '@/components/RichText';

import {
    Attachment,
    ContactCard,
    Embed,
    Gallery,
    Image,
    StoryBookmark,
    Variable,
    Video,
} from './components';

import styles from './ContentRenderer.module.scss';

interface Props {
    nodes: Node | Node[];
    story?: ExtendedStory;
}

function ContentRenderer({ nodes, story }: Props) {
    function renderDate(date: string) {
        return <FormattedDate value={date} year="numeric" month="long" day="numeric" />;
    }

    useEffect(() => {
        document.body.classList.add(styles.body);

        return () => {
            document.body.classList.remove(styles.body);
        };
    }, []);

    return (
        <div className={styles.renderer}>
            <Renderer
                nodes={nodes}
                defaultComponents
                coverageEntries={story?.referenced_entities.coverages}
                renderDate={renderDate}
            >
                <Component match={AttachmentNode.isAttachmentNode} component={Attachment} />
                <Component
                    match={ButtonBlockNode.isButtonBlockNode}
                    component={Elements.ButtonBlock}
                />
                <Component match={ContactNode.isContactNode} component={ContactCard} />
                <Component match={EmbedNode.isEmbedNode} component={Embed} />
                <Component match={GalleryNode.isGalleryNode} component={Gallery} />
                {/* Title and Subtitle heading rules must be defined above the general Heading */}
                <Component match={HeadingNode.isTitleHeadingNode} component={Elements.Ignore} />
                <Component match={HeadingNode.isSubtitleHeadingNode} component={Elements.Ignore} />
                <Component match={HeadingNode.isHeadingNode} component={Heading} />
                <Component match={HtmlNode.isHtmlNode} component={Html} />
                <Component match={ImageNode.isImageNode} component={Image} />
                <Component match={LinkNode.isLinkNode} component={Link} />
                <Component match={ListNode.isListNode} component={List} />
                <Component match={ListItemNode.isListItemNode} component={ListItem} />
                <Component match={ListItemTextNode.isListItemTextNode} component={ListItemText} />
                <Component match={ParagraphNode.isParagraphNode} component={Paragraph} />
                <Component match={QuoteNode.isQuoteNode} component={Quote} />
                <Component
                    match={StoryBookmarkNode.isStoryBookmarkNode}
                    component={StoryBookmark}
                />
                <Component match={VariableNode.isVariableNode} component={Variable} />
                <Component match={VideoNode.isVideoNode} component={Video} />
            </Renderer>
        </div>
    );
}

export default ContentRenderer;
