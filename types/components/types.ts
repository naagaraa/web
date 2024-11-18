import React from "react"

//  children or props
export type ChildrenProps = {
    children?: React.ReactNode
}

// title Props
export type titleProps = {
    value?: string
}

// externalLinkProps
export type externalLinkProps = {
    value: string
    route: string
}

// subtitle props
export type SubTitleProps = {
    value?: string
    externalLink?: externalLinkProps
}

// heading props
export type StackProps = {
    available?: boolean
    title?: string
}
export type HeadingProps = {
    name?: string,
    title?: string,
    stack?: StackProps
}

// hero props
export type HeroProps = {
    name?: string,
    title?: string,
    stack?: StackProps
}

// sectionHeader Props
export type sectionHeaderProps = {
    title: string;
    description: string;
    link?: string;
};

// list music props
export type listMusicProps = {
    source: string;
    provider?: string;
};

