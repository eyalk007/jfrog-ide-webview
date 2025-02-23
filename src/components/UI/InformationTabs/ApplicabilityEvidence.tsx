import { Applicability, IApplicableDetails, IEvidence } from '../../../model'
import { Collapse } from '../Collapse/Collapse'
import css from './ApplicabilityEvidence.module.css'
import { ReactComponent as EvidenceSvg } from '../../../assets/icons/evidence.svg'
import Row from '../../UI/Row/Row'
import Divider from '../../UI/Divider/Divider'
import Markdown from '../../UI/Markdown/Markdown'
import { useEffect } from 'react'

export interface Props {
	data: IApplicableDetails
}

const APPLICABILITY_TITLES: Partial<Record<Applicability, string>> = {
	[Applicability.APPLICABLE]: 'Why is this CVE applicable?',
	[Applicability.NOT_APPLICABLE]: 'Why is this CVE not applicable?',
	[Applicability.UNDETERMINED]: 'Why is this CVE applicability result undetermined?',
	[Applicability.MISSING_CONTEXT]: 'Why is this CVE missing context?'
}

const MISSING_CONTEXT_REASON =
	'The applicability for this CVE could be determined in binary files only'

const renderRow = (title: string, data: string): JSX.Element => <Row title={title} data={data} />

const renderEvidenceList = (evidenceList: IEvidence[], type: Applicability): JSX.Element => {
	const rows = evidenceList.map((evidence, index) => {
		const rowComponents: JSX.Element[] = [renderRow('Reason', evidence.reason)]

		if (type === Applicability.APPLICABLE) {
			rowComponents.push(
				renderRow('Evidence file path', evidence.filePathEvidence),
				renderRow('Evidence code', evidence.codeEvidence)
			)
		}

		return <div key={index}>{rowComponents}</div>
	})

	return (
		<>
			<h6 className={css.subtitle}>{APPLICABILITY_TITLES[type]}</h6>
			<div>
				<div className={css.rowList}>{rows}</div>
			</div>
			<Divider />
		</>
	)
}

export default function ApplicabilityEvidence(props: Props): JSX.Element {
	const { data } = props

	useEffect(() => {
		if (props.data.applicability === Applicability.MISSING_CONTEXT) {
			data.evidence = [{ reason: MISSING_CONTEXT_REASON } as IEvidence]
			data.searchTarget = ''
		}
	}, [data, props.data.applicability])
	return (
		<Collapse
			expanded
			header={
				<h1>
					<EvidenceSvg /> Contextual Analysis
				</h1>
			}
		>
			<div className={css.defaultContainer}>
				{data.evidence &&
					data.evidence.length > 0 &&
					renderEvidenceList(data.evidence, data.applicability)}
				{data.searchTarget && data.searchTarget !== '' && (
					<>
						<h6 className={css.subtitle}>What does the scanner check/look for?</h6>
						<Markdown text={data.searchTarget} />
					</>
				)}
			</div>
		</Collapse>
	)
}
