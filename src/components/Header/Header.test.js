import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import { Header } from './Header'

configure({ adapter: new Adapter() });

describe('Header', () => {
  const mockregisterModal = jest.fn()
  const props = { registerModal: mockregisterModal, projects: [] }
  const header = shallow(<Header {...props} />)
  // console.log(header.debug())
  it('render Header', () => {
    expect(header).toMatchSnapshot()
  })

  describe('registerModal() on click', () => {
    beforeEach(() => {
      header.find('.new-account').simulate('click')

      it('Call the `registerModal` callback', () => {
        expect(mockregisterModal).toHaveBeenCalled()
      })
    })
  })
})