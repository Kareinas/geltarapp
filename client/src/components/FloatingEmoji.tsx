import React from 'react';
import EmojiContainer from './EmojiContainer';

type EmojiParams = {
    label: string,
    emoji: string,
    parent: EmojiContainer
}

class FloatingEmoji extends React.Component<EmojiParams, {}> {

    interval: NodeJS.Timeout | undefined;
    emoji: React.RefObject<HTMLSpanElement>;
    startingPosY: number;

    constructor(props: EmojiParams) {
        super(props);
        this.emoji = React.createRef();
        this.startingPosY = Math.random() * 400 + 200;
    }

    componentDidMount() {
        this.interval = setInterval(this.updatePosition, 17 /* 60 FPS */);
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    updatePosition = () => {
        let posX = +this.emoji.current!.style.bottom.replace("px", "");
        posX += 1.9;
        this.emoji.current!.style.bottom = posX.toString() + "px";
        let posY = +this.emoji.current!.style.left.replace("px", "");
        posY = this.startingPosY + Math.sin(posX / 50) * 30;
        this.emoji.current!.style.left = posY.toString() + "px";

        if(posX > 2160 /* 4K height */) {
            this.props.parent.removeEmoji();
        }
    }

    render() {
        return (
            <span role="img" aria-label={this.props.label}  className="floating-emoji"
                ref={this.emoji}>{this.props.emoji}</span>
        );
    }
}

export default FloatingEmoji;