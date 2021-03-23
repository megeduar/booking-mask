import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './Tabs.css'

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array)
    }

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((c) => {
                        const { label, icon } = c.props;

                        return (
                            <Tab activeTab={activeTab} key={label} label={label} icon={icon} onClick={onClickTabItem}></Tab>
                        )
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((c) => {
                        if (c.props.label !== activeTab)
                            return undefined;
                        return c.props.children;
                    })}
                </div>
            </div>
        )
    }
}

export default Tabs