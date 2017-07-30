import React from 'react'

class Comp extends React.Component {
    render () {
        //console.log('COMP IS GETTING...', this.props)
        return (
            <div data-test-attr='foo' data-test-passed={this.props.passed}>
                { this.props.children }
            </div>
        )
    }
}

class ElemInElem extends React.Component {
	render () {
		return (
			<div data-test-attr='foo'>
				<div data-test-attr='foo'>
					String child
					{ this.props.children }
				</div>
			</div>
		)
	}
}

class CompInElem extends React.Component {
    render() {
        return (
            <div data-test-attr='foo'>
                <Comp passed="foo">
                	Passed child
                </Comp>
            </div>
        )
    }
}

class CompInComp extends React.Component {
    render() {
        return (
            <Comp passed={ this.props.passed }>
                <Comp passed="foo">
                	Passed child
                </Comp>
            </Comp>
        )
    }
}

const CompStl = (props) => {
    return (
        <div data-test-attr='foo' data-test-passed={props.passed}>
            { props.children }
        </div>
    )
}

const CompInElemStl = (props) => {
    return (
        <div data-test-attr="foo">
            <CompStl passed="foo">
            	Passed text
            </CompStl>
        </div>
    )
}

const CompInCompStl = (props) => {

    return (
        <CompStl passed="foo">
            <CompStl passed="foo">
            	Passed text
            </CompStl>
        </CompStl>
    )
}

const ArrInElemStl = (props) => {
    return (
        <div data-test-attr='foo' data-test-passed={props.passed}>
            <p data-test-attr='bar'>Test paragraph</p>
            <Comp passed="foo">Another test paragraph</Comp>
            <CompStl passed="foo" />
            Plain text
        </div>
    )
}

exports.Comp = Comp
exports.ElemInElem = ElemInElem
exports.CompInElem = CompInElem
exports.CompInComp = CompInComp
exports.CompStl = CompStl
exports.CompInElemStl = CompInElemStl
exports.CompInCompStl = CompInCompStl
exports.ArrInElemStl = ArrInElemStl