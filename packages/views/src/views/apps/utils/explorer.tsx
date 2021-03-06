import ExplorerInterface, {
	File,
} from "@web-desktop-environment/interfaces/lib/views/apps/utils/Explorer";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";
import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/styles";
import { Theme } from "@root/theme";
import Button from "@components/button";
import Icon from "@components/icon";
import TextField from "@components/textField";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			height: "100%",
			borderRadius: "0 0 15px 15px",
			background: theme.background.main,
			border: `1px solid ${theme.windowBorderColor}`,
			borderTop: "none",
			boxShadow: `-10px 12px 20px -2px  ${theme.shadowColor}`,
			paddingBottom: 15,
			backdropFilter: theme.type === "transparent" ? "blur(15px)" : "none",
		},
		actionBarContainer: {
			width: "100%",
			justifyContent: "center",
			display: "flex",
		},
		actionBar: {
			borderBottom: `1px solid ${theme.windowBorderColor}`,
			backdropFilter: theme.type === "transparent" ? "blur(20px)" : "none",
			width: "100%",
			justifyContent: "center",
			display: "flex",
		},
		actionButton: {
			padding: 3,
			minWidth: 40,
			textAlign: "center",
			userSelect: "none",
			color: theme.secondary.text,
			fontSize: 25,
			border: `1px solid ${theme.windowBorderColor}`,
			borderTop: "none",
			borderBottom: "none",
			cursor: "pointer",
			"&:hover":
				theme.type === "transparent"
					? {
							backdropFilter: "blur(13px)",
							background: theme.secondary.light,
					  }
					: {
							background: theme.secondary.light,
					  },
		},
		actionButtonDisabled: {
			cursor: "default",
			backgroundColor:
				theme.background.transparentDark || theme.background.dark,
			"&:hover": {
				backgroundColor:
					theme.background.transparentDark || theme.background.dark,
			},
		},
		locationBarContainer: {
			width: "100%",
			justifyContent: "center",
			display: "flex",
		},
		locationBar: {
			border: `1px solid ${theme.windowBorderColor}`,
			borderRight: "none",
			borderLeft: "none",
			backdropFilter: theme.type === "transparent" ? "blur(20px)" : "none",
			width: "100%",
			maxHeight: "100%",
			overflowX: "auto",
		},
		breadcrumbFilesContainer: {
			maxHeight: "100%",
			display: "flex",
			justifyContent: "center",
			margin: 4,
		},
		fileBoxContainer: {
			height: "95%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
		},
		fileBox: {
			margin: 15,
			boxShadow: `${theme.shadowColor} 0px 0px 20px -6px inset`,
			background: theme.background.transparent || theme.background.main,
			border: `${theme.windowBorderColor} 1px solid`,
			borderRadius: 7,
			width: "100%",
			height: "90%",
			overflowY: "auto",
		},
		fileContainer: {
			display: "grid",
			gridTemplateColumns: "repeat(6,1fr)",
			margin: 15,
			gridGap: 10,
			gridAutoRows: 100,
		},
		file: {
			borderBottom: `1px solid ${theme.windowBorderColor}`,
			borderRadius: 7,
			color: theme.secondary.text,
			cursor: "pointer",
			boxShadow: `-1px 2px 20px 1px ${theme.shadowColor}`,
			"&:hover": {
				background: theme.secondary.dark,
				backdropFilter: theme.type === "transparent" ? "blur(12px)" : "none",
			},
			height: 90,
			display: "flex",
			flexDirection: "column-reverse",
		},
		transparent: {
			background: "transparent !important",
		},
		fileActive: {
			background: theme.secondary.transparent || theme.secondary.main,
			"&:hover": {
				backdropFilter: theme.type === "transparent" ? "blur(12px)" : "none",
				background: theme.secondary.transparent || theme.secondary.main,
			},
		},
		fileName: {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			maxWidth: 100,
			textAlign: "center",
			userSelect: "none",
		},
		fileIcon: {
			userSelect: "none",
			textAlign: "center",
			maxWidth: 100,
			fontSize: 50,
		},
		fileBreadcrumb: {
			width: "100%",
		},
		breadcrumbButtonItem: {
			height: "100%",
			minWidth: 20,
			textAlign: "center",
			userSelect: "none",
			color: theme.primary.text,
			fontSize: 25,
			background: theme.primary.transparent,
			border: "solid 1px transparent",
			maxWidth: 380,
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			"&:hover": {
				background: theme.primary.main,
			},
			cursor: "pointer",
		},
		breadcrumbButtonItemFirst: {
			borderRadius: "8px 0 0 8px",
			paddingLeft: 10,
		},
		breadcrumbButtonItemLast: {
			cursor: "auto",
			borderRadius: "0 8px 8px 0",
			background: theme.primary.main,
			border: `solid 1px ${theme.windowBorderColor}`,
			"&:hover": {
				background: theme.primary.main,
				backdropFilter: theme.type === "transparent" ? "blur(12px)" : "none",
			},
			paddingRight: 10,
		},
		dialog: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%",
			flexDirection: "column",
		},
		dialogMessage: {
			maxWidth: "80%",
			textAlign: "center",
			color: theme.background.text,
			fontSize: 25,
		},
		dialogButtons: {
			margin: 20,
			width: "50%",
			display: "flex",
			justifyContent: "center",
		},
		dialogButton: {
			margin: 10,
			fontSize: 50,
			width: "fit-content",
			height: "fit-content",
			borderRadius: 7,
			background: theme.primary.main,
			"&:hover": {
				background: theme.primary.dark,
				backdropFilter: theme.type === "transparent" ? "blur(12px)" : "none",
			},
		},
		dialogButtonPrimary: {
			background: theme.secondary.main,
			"&:hover": {
				background: theme.secondary.dark,
				backdropFilter: theme.type === "transparent" ? "blur(12px)" : "none",
			},
		},
		dialogInput: {
			margin: 10,
			color: theme.background.text,
			fontSize: 25,
		},
	});

interface ExplorerState {
	fileIsOverFile?: number;
	selectedFile?: number;
	dragedFile?: File;
	copyPath?: { fullPath: string; name: string };
	cutPath?: { fullPath: string; name: string };
	confirm?: {
		message: string;
		result?: boolean;
	};
	prompt?: {
		message: string;
		value: string;
		result?: boolean;
	};
}

// using ReflowReactComponent in this case provides the event() and done() callbacks.
class Explorer extends ReflowReactComponent<
	ExplorerInterface,
	WithStyles<typeof styles>,
	ExplorerState
> {
	selectedFile?: File & { fullPath: string };
	constructor(props: Explorer["props"]) {
		super(props);
		this.state = {};
	}

	confirm = async (message: string) => {
		return await new Promise((resolve) => {
			this.setState(
				{
					confirm: {
						message,
					},
				},
				() => {
					const checkForResult = () => {
						const { confirm } = this.state;
						if (confirm && confirm.result !== undefined) {
							resolve(confirm.result);
							this.setState({ confirm: undefined });
						} else {
							setTimeout(checkForResult, 5);
						}
					};
					checkForResult();
				}
			);
		});
	};

	prompt = async (
		message: string
	): Promise<{ result: boolean; value: string }> => {
		return await new Promise((resolve) => {
			this.setState(
				{
					prompt: {
						message,
						value: "",
					},
				},
				() => {
					const checkForResult = () => {
						const { prompt } = this.state;
						if (prompt && prompt.result !== undefined) {
							resolve({ result: prompt.result, value: prompt.value });
							this.setState({ prompt: undefined });
						} else {
							setTimeout(checkForResult, 5);
						}
					};
					checkForResult();
				}
			);
		});
	};

	getBreadcrumbLocations = (maxLength: number) => {
		const { currentPath, platfromPathSperator, event } = this.props;
		let currentLocation = "";
		const pathArray: string[] = [];
		currentPath
			.split(platfromPathSperator)
			.filter((path) => path)
			.forEach((path) => pathArray.push(`${path}${platfromPathSperator}`));
		pathArray.unshift(platfromPathSperator);
		const result = pathArray.map((path, i) => {
			currentLocation += path;
			const pathPartPath = currentLocation;
			return {
				path,
				isFirst: i === 0,
				isLast: i === pathArray.length - 1,
				onClick: () => {
					event("changeCurrentPath", pathPartPath);
					this.setState({ selectedFile: undefined });
					this.selectedFile = undefined;
				},
				onDrop: () => this.onDropPath(pathPartPath),
			};
		});
		while (result.length > maxLength) {
			result.shift();
			result[0].isFirst = true;
		}
		return result;
	};

	private onDrop = async (target: File) => {
		const { currentPath, platfromPathSperator, event } = this.props;
		this.setState({ dragedFile: undefined });
		if (
			this.state.dragedFile &&
			this.state.dragedFile !== target &&
			target.isFolder
		) {
			const newPath = `${currentPath}${platfromPathSperator}${target.name}${platfromPathSperator}${this.state.dragedFile.name}`;
			const originalPath = `${currentPath}${platfromPathSperator}${this.state.dragedFile.name}`;
			this.setState({
				fileIsOverFile: undefined,
				selectedFile: undefined,
			});
			if (
				await this.confirm(
					` do you want to move ${this.state.dragedFile.name} to ${newPath}`
				)
			) {
				event("move", {
					newPath,
					originalPath,
				});
			}
		}
	};

	private onDropPath = async (path: string) => {
		console.log("drop");
		const { currentPath, platfromPathSperator, event } = this.props;
		if (this.state.dragedFile) {
			const newPath = `${path}${platfromPathSperator}${this.state.dragedFile.name}`;
			const originalPath = `${currentPath}${platfromPathSperator}${this.state.dragedFile.name}`;
			this.setState({
				fileIsOverFile: undefined,
				selectedFile: undefined,
			});
			if (
				await this.confirm(
					` do you want to move ${this.state.dragedFile.name} to ${newPath}`
				)
			) {
				event("move", {
					newPath,
					originalPath,
				});
			}
		}
	};

	private onFileDragOver = (file: File, index: number) => {
		if (
			file.isFolder &&
			this.state.dragedFile?.name !== file.name &&
			this.state.fileIsOverFile !== index
		) {
			this.setState({ fileIsOverFile: index });
		}
	};

	deleteSelected = async () => {
		if (
			this.selectedFile &&
			(await this.confirm(
				`are you sure you want to delete ${this.selectedFile.name}`
			))
		) {
			this.props.event("delete", this.selectedFile.name);
		}
	};

	createFolder = async () => {
		const promptCreate = await this.prompt("please enter folder name:");
		if (promptCreate.value) {
			this.props.event("createFolder", promptCreate.value);
		}
	};

	private Past = () => {
		const { cutPath, copyPath } = this.state;
		const { event, platfromPathSperator, currentPath } = this.props;
		if (cutPath || copyPath) {
			if (this.selectedFile?.isFolder) {
				if (cutPath && cutPath.fullPath !== this.selectedFile?.fullPath) {
					event("move", {
						newPath: `${this.selectedFile.fullPath}${platfromPathSperator}${cutPath.name}`,
						originalPath: cutPath.fullPath,
					});
					this.setState({ copyPath: undefined });
				}
				if (copyPath && copyPath.fullPath !== this.selectedFile?.fullPath) {
					event("copy", {
						newPath: `${this.selectedFile.fullPath}${platfromPathSperator}${copyPath.name}`,
						originalPath: copyPath.fullPath,
					});
				}
			} else {
				if (cutPath) {
					event("move", {
						newPath: `${currentPath}${platfromPathSperator}${cutPath.name}`,
						originalPath: cutPath.fullPath,
					});
				}
				if (copyPath) {
					event("copy", {
						newPath: `${currentPath}${platfromPathSperator}${copyPath.name}`,
						originalPath: copyPath.fullPath,
					});
				}
			}
		}
	};

	render() {
		const {
			classes,
			files,
			event,
			currentPath,
			platfromPathSperator,
		} = this.props;
		const { fileIsOverFile, selectedFile, copyPath, cutPath } = this.state;
		return (
			<div className={classes.root}>
				<div className={classes.locationBarContainer}>
					<div className={classes.locationBar}>
						<div className={classes.breadcrumbFilesContainer}>
							{this.getBreadcrumbLocations(6).map((breadcrumbItem, index) => (
								<div
									className={`${classes.breadcrumbButtonItem} ${
										breadcrumbItem.isFirst
											? classes.breadcrumbButtonItemFirst
											: ""
									} ${
										breadcrumbItem.isLast
											? classes.breadcrumbButtonItemLast
											: ""
									}`}
									key={index}
									onDrop={breadcrumbItem.onDrop}
									onDragOverCapture={(e) => e.preventDefault()}
									onClick={breadcrumbItem.onClick}
								>
									{breadcrumbItem.path}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={classes.actionBarContainer}>
					<div className={classes.actionBar}>
						<div className={classes.actionButton} onClick={this.deleteSelected}>
							Delete
						</div>
						<div className={classes.actionButton} onClick={this.createFolder}>
							Create Folder
						</div>
						<div
							className={`${classes.actionButton} ${
								selectedFile === undefined ? classes.actionButtonDisabled : ""
							}`}
							onClick={() =>
								this.selectedFile &&
								this.setState({
									copyPath: {
										fullPath: this.selectedFile.fullPath,
										name: this.selectedFile.name,
									},
									cutPath: undefined,
								})
							}
						>
							Copy
						</div>
						<div
							className={`${classes.actionButton} ${
								selectedFile === undefined ? classes.actionButtonDisabled : ""
							}`}
							onClick={() =>
								this.selectedFile &&
								this.setState({
									cutPath: {
										fullPath: this.selectedFile.fullPath,
										name: this.selectedFile.name,
									},
									copyPath: undefined,
								})
							}
						>
							Cut
						</div>
						<div
							className={`${classes.actionButton} ${
								cutPath === undefined && copyPath === undefined
									? classes.actionButtonDisabled
									: ""
							}`}
							onClick={this.Past}
						>
							Past
						</div>
					</div>
				</div>
				<div className={classes.fileBoxContainer}>
					<div className={classes.fileBox}>
						{this.state.prompt && (
							<div className={classes.dialog}>
								<div className={classes.dialogMessage}>
									{this.state.prompt.message}
								</div>
								<TextField
									value={this.state.prompt.value}
									onChange={(newValue) =>
										this.state.prompt &&
										this.setState({
											prompt: { ...this.state.prompt, value: newValue || "" },
										})
									}
									className={classes.dialogInput}
								/>
								<div className={classes.dialogButtons}>
									<Button
										className={classes.dialogButton}
										onClick={() =>
											this.state.prompt &&
											this.setState({
												prompt: { ...this.state.prompt, result: false },
											})
										}
									>
										Cancel
									</Button>
									<Button
										color="secondary"
										className={`${classes.dialogButton} ${classes.dialogButtonPrimary}`}
										onClick={() =>
											this.state.prompt &&
											this.setState({
												prompt: { ...this.state.prompt, result: true },
											})
										}
									>
										OK
									</Button>
								</div>
							</div>
						)}
						{this.state.confirm && (
							<div className={classes.dialog}>
								<div className={classes.dialogMessage}>
									{this.state.confirm.message}
								</div>
								<div className={classes.dialogButtons}>
									<Button
										className={classes.dialogButton}
										onClick={() =>
											this.setState((state) =>
												state.confirm?.message
													? {
															confirm: {
																message: state.confirm.message,
																result: false,
															},
													  }
													: {}
											)
										}
									>
										Cancel
									</Button>
									<Button
										color="secondary"
										className={`${classes.dialogButton} ${classes.dialogButtonPrimary}`}
										onClick={() =>
											this.setState((state) =>
												state.confirm?.message
													? {
															confirm: {
																message: state.confirm.message,
																result: true,
															},
													  }
													: {}
											)
										}
									>
										OK
									</Button>
								</div>
							</div>
						)}
						{!this.state.prompt && !this.state.confirm && (
							<div className={classes.fileContainer}>
								{files.map((file, index) => (
									<div
										className={`${classes.file} ${
											fileIsOverFile === index || selectedFile === index
												? classes.fileActive
												: ""
										} ${
											this.state.dragedFile === file ? classes.transparent : ""
										}`}
										key={index}
										draggable
										onDrag={() => {
											this.setState({ dragedFile: file });
										}}
										onDrop={() => this.onDrop(file)}
										onDragOverCapture={(e) => {
											this.onFileDragOver(file, index);
											e.preventDefault();
										}}
										onDragLeave={() => {
											if (fileIsOverFile === index) {
												this.setState({ fileIsOverFile: undefined });
											}
										}}
										onClick={() => {
											if (selectedFile !== index) {
												this.setState({ selectedFile: index });
											}
											this.selectedFile = {
												...file,
												fullPath: `${currentPath}${platfromPathSperator}${file.name}`,
											};
										}}
										onDoubleClick={() =>
											file.isFolder &&
											event(
												"changeCurrentPath",
												`${currentPath}${platfromPathSperator}${file.name}${platfromPathSperator}`
											)
										}
									>
										<div className={classes.fileName}>{file.name}</div>
										{file.isFolder ? (
											<Icon
												className={classes.fileIcon}
												name={
													fileIsOverFile === index
														? "FcOpenedFolder"
														: "FcFolder"
												}
											/>
										) : (
											<Icon className={classes.fileIcon} name="FcDocument" />
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Explorer);
